/**
 * Proxy AI cho PWA tĩnh "Kỹ năng Kiểm sát".
 * - Key nhà cung cấp nằm ở Worker Secrets, không đưa vào frontend.
 * - BYOK: client gửi X-User-Provider + X-User-Api-Key; Worker chỉ chuyển tiếp, không lưu.
 * - Không ghi log nội dung prompt/response (văn bản tư pháp nhạy cảm).
 *
 * POST /api/chat
 * Body: { messages: [{ role, content }], system?, max_tokens? }
 */

const PROVIDERS = {
  groq: {
    url: "https://api.groq.com/openai/v1/chat/completions",
    defaultModelEnv: "GROQ_MODEL",
    fallbackModel: "qwen/qwen3.8-27b",
    secretEnv: "GROQ_API_KEY",
  },
  gemini: {
    // OpenAI-compatible endpoint — cùng schema với Groq, dễ fallback.
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    defaultModelEnv: "GEMINI_MODEL",
    fallbackModel: "gemini-3.5-flash-lite",
    secretEnv: "GEMINI_API_KEY",
  },
};

export default {
  async fetch(request, rawEnv, ctx) {
    const env = Object.assign({
      PROVIDER_ORDER: "groq,gemini",
      GROQ_MODEL: "qwen/qwen3.8-27b",
      GEMINI_MODEL: "gemini-3.5-flash-lite",
      ALLOWED_ORIGINS: "https://hethong-quanly.github.io",
      RATE_LIMIT_PER_MINUTE: "8",
      RATE_LIMIT_PER_DAY: "40",
      MAX_BODY_BYTES: "200000",
    }, rawEnv);
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/api/health") {
      return json({ ok: true, providers: configuredProviders(env) }, 200, cors);
    }

    if (request.method !== "POST" || url.pathname !== "/api/chat") {
      return json({ error: "Not found" }, 404, cors);
    }

    const allowed = allowedOrigins(env);
    if (origin && allowed.length && !allowed.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const limited = await rateLimit(ip, env);
    if (limited) {
      return json(
        { error: "Quá số lần dùng miễn phí. Thử lại sau hoặc dùng khoá API của bạn (BYOK)." },
        429,
        { ...cors, "Retry-After": String(limited.retryAfter) }
      );
    }

    let body;
    try {
      const raw = await request.arrayBuffer();
      const maxBytes = Number(env.MAX_BODY_BYTES || 200000);
      if (raw.byteLength > maxBytes) {
        return json({ error: "Nội dung quá lớn. Hãy ẩn danh hoá và rút gọn văn bản trước." }, 413, cors);
      }
      body = JSON.parse(new TextDecoder().decode(raw));
    } catch {
      return json({ error: "JSON không hợp lệ" }, 400, cors);
    }

    const messages = normalizeMessages(body);
    if (!messages) {
      return json({ error: "Thiếu messages (mảng {role, content})" }, 400, cors);
    }

    const byokProvider = (request.headers.get("X-User-Provider") || "").trim().toLowerCase();
    const byokKey = (request.headers.get("X-User-Api-Key") || "").trim();

    const chain = [];
    if (byokKey && PROVIDERS[byokProvider]) {
      chain.push({ id: byokProvider, key: byokKey, source: "byok" });
    }
    for (const id of providerOrder(env)) {
      const conf = PROVIDERS[id];
      const key = conf && env[conf.secretEnv];
      if (key) chain.push({ id, key, source: "shared" });
    }

    if (!chain.length) {
      return json({ error: "Chưa cấu hình API key (secret hoặc BYOK)." }, 503, cors);
    }

    const errors = [];
    for (const step of chain) {
      try {
        const result = await callOpenAICompat(step, messages, body, env);
        if (result.ok) {
          return json(
            {
              provider: step.id,
              source: step.source,
              model: result.model,
              content: result.content,
              usage: result.usage || null,
            },
            200,
            cors
          );
        }
        errors.push({ provider: step.id, status: result.status, error: result.error });
        // 401/403 trên BYOK: không fallback sang key dùng chung (tránh lộ lỗi rồi đốt quota).
        if (step.source === "byok" && (result.status === 401 || result.status === 403)) {
          return json({ error: "Khoá API của bạn bị từ chối.", details: errors }, 401, cors);
        }
      } catch (err) {
        errors.push({ provider: step.id, error: "network_error" });
      }
    }

    const aiFallback = await tryWorkersAI(env, messages, body);
    if (aiFallback) {
      return json(aiFallback, 200, cors);
    }

    return json({ error: "Mọi nhà cung cấp đều hết lượt hoặc lỗi.", details: errors }, 502, cors);
  },
};

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsHeaders(origin, env) {
  const allowed = allowedOrigins(env);
  const allow = !origin || allowed.includes(origin) ? origin || "*" : allowed[0] || "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Provider, X-User-Api-Key",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

function providerOrder(env) {
  const raw = String(env.PROVIDER_ORDER || "groq,gemini")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((id) => PROVIDERS[id]);
  return raw.length ? raw : ["groq", "gemini"];
}

function configuredProviders(env) {
  return providerOrder(env).filter((id) => Boolean(env[PROVIDERS[id].secretEnv]));
}

function normalizeMessages(body) {
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) return null;
  const out = body.messages
    .filter((m) => m && typeof m.content === "string" && m.content.trim())
    .map((m) => ({
      role: m.role === "assistant" || m.role === "system" ? m.role : "user",
      content: String(m.content).slice(0, 100_000),
    }));
  if (typeof body.system === "string" && body.system.trim()) {
    out.unshift({ role: "system", content: body.system.slice(0, 20_000) });
  }
  return out.length ? out : null;
}

async function callOpenAICompat(step, messages, body, env) {
  const conf = PROVIDERS[step.id];
  const model = body.model || env[conf.defaultModelEnv] || conf.fallbackModel;
  const res = await fetch(conf.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${step.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: typeof body.temperature === "number" ? body.temperature : 0.2,
      max_tokens: typeof body.max_tokens === "number" ? body.max_tokens : 2048,
    }),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, status: res.status, error: "invalid_upstream_json" };
  }

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: data.error?.message || data.error?.status || `http_${res.status}`,
    };
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) return { ok: false, status: 502, error: "empty_content" };
  return { ok: true, model: data.model || model, content, usage: data.usage };
}

async function tryWorkersAI(env, messages, body) {
  if (!env.AI || typeof env.AI.run !== "function") return null;
  try {
    const result = await env.AI.run("@cf/qwen/qwen3.8-27b", {
      messages,
      max_tokens: typeof body.max_tokens === "number" ? body.max_tokens : 1024,
    });
    const content = result?.response || result?.result?.response;
    if (!content) return null;
    return { provider: "workers-ai", source: "shared", model: "@cf/qwen/qwen3.8-27b", content, usage: null };
  } catch {
    return null;
  }
}

/**
 * Rate limit theo IP bằng Cache API (không cần KV).
 * Phù hợp mẫu / traffic vừa; production lớn nên chuyển sang Workers Rate Limiting binding.
 */
async function rateLimit(ip, env) {
  const perMin = Number(env.RATE_LIMIT_PER_MINUTE || 8);
  const perDay = Number(env.RATE_LIMIT_PER_DAY || 40);
  const minuteKey = `rl:m:${ip}:${Math.floor(Date.now() / 60_000)}`;
  const dayKey = `rl:d:${ip}:${new Date().toISOString().slice(0, 10)}`;

  const minCount = await bump(minuteKey, 70);
  if (minCount > perMin) return { retryAfter: 60 };
  const dayCount = await bump(dayKey, 90000);
  if (dayCount > perDay) return { retryAfter: 3600 };
  return null;
}

async function bump(key, ttlSeconds) {
  const cache = caches.default;
  const url = new URL(`https://rate-limit.internal/${encodeURIComponent(key)}`);
  const hit = await cache.match(url);
  const current = hit ? Number(await hit.text()) || 0 : 0;
  const next = current + 1;
  const res = new Response(String(next), {
    headers: { "Cache-Control": `max-age=${ttlSeconds}`, "Content-Type": "text/plain" },
  });
  await cache.put(url, res);
  return next;
}
