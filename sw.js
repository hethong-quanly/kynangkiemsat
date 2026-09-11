/* Kỹ năng Kiểm sát — service worker.
   Cache HTML tools + static assets so the installed app works offline.
   Skip large Windows zips, Tesseract, video. CDN fonts/css cached at runtime. */
const CACHE = "knks-v4";
const SCOPE = self.registration.scope;

const PRECACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./theme.js",
  "./theme-tool.css",
  "./apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png",
  "./icons/favicon-32.png",
  "./static/logo_moi.png",
  "./Tool/App_tinh_lai_suat/index.html",
  "./Tool/App_tinh_lai_suat/static/logo_moi.png",
  "./Tool/App_DS/index.html",
  "./Tool/GiaiQuyetKnTc/index.html",
  "./Tool/KiemSatThads/index.html",
  "./Tool/KiemSatThahs/index.html",
  "./Tool/KiemSatAnHs/index.html",
  "./Tool/SoanQdPhanCong/index.html",
  "./Tool/AnDanh/index.html",
  "./Tool/FileRenamer/index.html",
  "./Tool/DocxToMd/index.html",
  "./Tool/OCR_PDF_Tool/index.html",
  "./Data/TinhTuoiThoiHan.html",
  "./Data/HuongDan.html",
  "./Data/Slide.html"
];

const CDN = [
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
  "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&display=swap",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-regular-400.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2"
];

const CDN_HOSTS = new Set([
  "cdn.tailwindcss.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "cdn.jsdelivr.net",
  "cdnjs.cloudflare.com"
]);

function abs(path) {
  return new URL(path, SCOPE).href;
}

function skipUrl(url) {
  const p = url.pathname || "";
  if (/\.(zip|exe|mp4|docx|xlsx|md)$/i.test(p)) return true;
  if (/Tesseract-OCR|_internal|Recording\.mp4|Nen\.jpg/i.test(p)) return true;
  return false;
}

async function putAll(cache, urls) {
  await Promise.all(
    urls.map(async (u) => {
      try {
        const req = new Request(u, { mode: u.startsWith("http") && !u.startsWith(SCOPE) ? "cors" : "same-origin", cache: "reload" });
        const res = await fetch(req);
        if (res && res.ok) await cache.put(req, res);
      } catch (e) { /* ignore missing optional assets */ }
    })
  );
}

async function cacheFontFiles(cache) {
  const cssUrls = CDN.filter((u) => u.includes("fonts.googleapis.com"));
  for (const cssUrl of cssUrls) {
    try {
      const res = await fetch(cssUrl, { mode: "cors", cache: "reload" });
      if (!res.ok) continue;
      const text = await res.text();
      await cache.put(cssUrl, new Response(text, { headers: res.headers }));
      const files = [...text.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].replace(/['"]/g, "").trim());
      await putAll(cache, files.filter((u) => /^https:/.test(u)));
    } catch (e) { /* fonts optional */ }
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await putAll(cache, PRECACHE.map(abs));
    await putAll(cache, CDN.filter((u) => !u.includes("fonts.googleapis.com")));
    await cacheFontFiles(cache);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

async function fromCache(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const url = new URL(request.url);
  if (url.origin === new URL(SCOPE).origin) {
    const bare = await caches.match(abs("./index.html"));
    if (bare && (url.pathname === new URL(SCOPE).pathname || url.pathname === new URL("./index.html", SCOPE).pathname)) {
      return bare;
    }
  }
  return null;
}

async function networkFirst(request) {
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok && !skipUrl(new URL(request.url))) {
      const cache = await caches.open(CACHE);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (e) {
    const cached = await fromCache(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const offline = await caches.match(abs("./offline.html"));
      if (offline) return offline;
    }
    throw e;
  }
}

async function cacheFirst(request) {
  const cached = await fromCache(request);
  if (cached) {
    fetch(request).then((fresh) => {
      if (fresh && fresh.ok && !skipUrl(new URL(request.url))) {
        caches.open(CACHE).then((c) => c.put(request, fresh));
      }
    }).catch(() => {});
    return cached;
  }
  return networkFirst(request);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  if (skipUrl(url)) return;

  const sameOrigin = url.origin === new URL(SCOPE).origin;
  const isCdn = CDN_HOSTS.has(url.hostname);
  if (!sameOrigin && !isCdn) return;

  if (req.mode === "navigate") {
    event.respondWith(networkFirst(req));
    return;
  }
  if (sameOrigin && /\.html?$/i.test(url.pathname)) {
    event.respondWith(networkFirst(req));
    return;
  }
  event.respondWith(cacheFirst(req));
});
