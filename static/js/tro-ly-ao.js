/* Kỹ năng Kiểm sát — module dùng chung: "Trợ lý ảo Kiểm sát văn bản tư pháp" + bộ gắn tab.
   Cần nạp trước: knks-linh-vuc.js. Nạp sau (tuỳ chọn): soan-qd-phan-cong.js.
   Dùng trên 1 trang kỹ năng:
     <script src="../../static/js/knks-linh-vuc.js"></script>
     <script src="../../static/js/tro-ly-ao.js"></script>
     <script src="../../static/js/soan-qd-phan-cong.js"></script>
     <script>KNKS.attach({ linhVuc: "thahs" });</script>
   Mặc định chạy HOÀN TOÀN TRÊN MÁY (quy tắc), không gửi dữ liệu đi đâu.
   Chế độ AI (tuỳ chọn) chỉ bật khi người dùng tự nhập API key của mình và tích đồng ý. */
(function (g) {
  "use strict";
  var C = g.KNKS_LINH_VUC;
  if (!C) { console.error("Thiếu knks-linh-vuc.js"); return; }
  var K = g.KNKS = g.KNKS || {};

  /* ---------------- tiện ích chung ---------------- */
  var CDN = {
    jszip: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
    pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    pdfWorker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
  };
  var loaded = {};
  function loadScript(src) {
    if (!loaded[src]) loaded[src] = new Promise(function (ok, fail) {
      var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = fail; document.head.appendChild(s);
    });
    return loaded[src];
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function decodeXml(s) { return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'").replace(/&amp;/g, "&"); }
  function today() { var n = new Date(); return n.getFullYear() + "-" + ("0" + (n.getMonth() + 1)).slice(-2) + "-" + ("0" + n.getDate()).slice(-2); }
  function has(text, needles) { var t = text.toLowerCase(); return needles.some(function (n) { return t.indexOf(n.toLowerCase()) >= 0; }); }
  function docxXmlToText(xml) {
    return decodeXml(xml.replace(/<w:tab\/>/g, "\t").replace(/<w:br[^>]*\/>/g, "\n").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "")).replace(/\n{3,}/g, "\n\n").trim();
  }
  function readFileText(file) {
    var n = file.name.toLowerCase();
    if (/\.(txt|md)$/.test(n)) return file.text();
    if (/\.docx$/.test(n)) return loadScript(CDN.jszip).then(function () { return file.arrayBuffer(); })
      .then(function (b) { return g.JSZip.loadAsync(b); })
      .then(function (z) { var f = z.file("word/document.xml"); if (!f) throw new Error("docx"); return f.async("string"); })
      .then(docxXmlToText);
    if (/\.pdf$/.test(n)) return loadScript(CDN.pdf).then(function () {
      g.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN.pdfWorker; return file.arrayBuffer();
    }).then(function (b) { return g.pdfjsLib.getDocument({ data: b }).promise; }).then(async function (pdf) {
      var out = [];
      for (var i = 1; i <= pdf.numPages; i++) {
        var c = await (await pdf.getPage(i)).getTextContent();
        out.push("## Trang " + i + "\n\n" + c.items.map(function (it) { return it.str || ""; }).join(" ").replace(/\s+/g, " ").trim());
      }
      return out.join("\n\n");
    });
    return Promise.reject(new Error("type"));
  }
  K.util = { esc: esc, today: today, readFileText: readFileText, loadScript: loadScript, CDN: CDN, docxXmlToText: docxXmlToText };

  /* ---------------- CSS riêng của module (tiền tố knai-) ---------------- */
  function injectCss() {
    if (document.getElementById("knai-css")) return;
    var s = document.createElement("style"); s.id = "knai-css";
    s.textContent = [
      ".knai textarea{width:100%;min-height:160px;border:1px solid var(--line,#d9d2c5);border-radius:10px;padding:8px 10px;font:inherit;font-size:14px;background:#f8fafc;color:inherit}",
      ".knai input[type=text],.knai input[type=date],.knai input:not([type]),.knai input[type=password],.knai select{width:100%;min-height:42px;border:1px solid var(--line,#d9d2c5);border-radius:10px;padding:8px 10px;font:inherit;font-size:14px;background:#f8fafc;color:inherit}",
      ".knai-chat{max-height:58vh;min-height:260px;overflow:auto}",
      ".knai-msg{white-space:pre-wrap;border-radius:12px;padding:10px 12px;margin:8px 0;font-size:13px;line-height:1.55}",
      ".knai-msg.bot{background:#f8fafc;border:1px solid #e2e8f0}",
      ".knai-msg.me{background:var(--navy,#0c2340);color:#fff;margin-left:28px}",
      ".knai .chip.on{background:var(--navy,#0c2340);color:#fff;border-color:var(--navy,#0c2340)}",
      ".knai-preview{white-space:pre-wrap;font-family:'Times New Roman',serif;font-size:13.5px;line-height:1.5;max-height:480px;overflow:auto;background:var(--paper,#fbf8f1);padding:16px;border-radius:10px}",
      ".knai-khau{border:1px solid #e2e8f0;background:#f8fafc;border-radius:12px;padding:12px;text-align:left;font:inherit;min-height:72px;color:inherit}",
      ".knai-khau.on{background:var(--navy,#0c2340);color:#fff;border-color:var(--navy,#0c2340)}",
      ".knai-khau small{display:block;opacity:.75;margin-top:4px;font-size:11px}",
      ".knai-note{background:#fff8e1;border:1px solid #ffe082;border-radius:12px;padding:10px 12px;font-size:12px;color:#6d4c00;line-height:1.5;margin-top:10px}",
      ".knai table{width:100%;border-collapse:collapse;font-size:12px}.knai th,.knai td{text-align:left;padding:6px 8px;border-bottom:1px solid #eee;vertical-align:top}",
      "html[data-theme=dark] .knai textarea,html[data-theme=dark] .knai input,html[data-theme=dark] .knai select,html[data-theme=dark] .knai-msg.bot,html[data-theme=dark] .knai-khau{background:#15202b;border-color:#2c3d4e}",
      "html[data-theme=dark] .knai-preview{background:#182430}"
    ].join("\n");
    document.head.appendChild(s);
  }

  /* ---------------- lõi kiểm sát (không cần mạng) ---------------- */
  var RE_SO = /(?:số|so)[:.\s]*([0-9]{1,5}\s*\/\s*[0-9]{4}(?:\/[A-ZÀ-Ỹ0-9.\-]+)?|[0-9]{1,5}\/[A-ZĐÀ-Ỹ0-9.\-]+)/i;
  var RE_NGAY = /ngày\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i;
  var RE_NGAY2 = /\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})\b/;
  var RE_CQ = /((?:tòa án|chi cục thi hành án|cục thi hành án|văn phòng thừa hành viên|viện kiểm sát|cơ quan thi hành án|trại giam|trại tạm giam|nhà tạm giữ|cơ quan cảnh sát điều tra|cơ quan điều tra|công an)[^\n,.]{0,80})/i;
  function extractMeta(text) {
    var so = text.match(RE_SO), ng = text.match(RE_NGAY) || text.match(RE_NGAY2), cq = text.match(RE_CQ);
    return {
      soKyHieu: so ? so[1].replace(/\s+/g, "") : "",
      ngayBanHanh: ng ? ("0" + ng[1]).slice(-2) + "/" + ("0" + ng[2]).slice(-2) + "/" + ng[3] : "",
      coQuan: cq ? cq[1].replace(/\s+/g, " ").trim() : ""
    };
  }
  function runChecks(loai, text) {
    var m = extractMeta(text), vb = C.VAN_BAN[loai];
    var common = [
      { title: "Quốc hiệu, tiêu ngữ", ok: has(text, ["cộng hòa xã hội chủ nghĩa", "cộng hoà xã hội chủ nghĩa", "độc lập - tự do"]), note: "Đầu văn bản phải có Quốc hiệu và tiêu ngữ." },
      { title: "Số, ký hiệu", ok: !!m.soKyHieu, note: m.soKyHieu || "Chưa nhận diện số/ký hiệu." },
      { title: "Ngày ban hành", ok: !!m.ngayBanHanh, note: m.ngayBanHanh || "Chưa nhận diện ngày tháng năm." },
      { title: "Cơ quan ban hành", ok: !!m.coQuan, note: m.coQuan || "Chưa nhận diện cơ quan ban hành." },
      { title: "Căn cứ pháp luật", ok: has(text, ["căn cứ"]), note: "Phần căn cứ luật, nghị định, thông tư." },
      { title: "Phần quyết định / tuyên", ok: has(text, ["quyết định", "tuyên xử", "xử:", "lệnh"]), note: "Phần quyết định phải rõ, không mâu thuẫn phần nhận định." }
    ];
    return common.concat((vb ? vb.checks : []).map(function (c) { return { title: c[1], ok: has(text, c[2]), note: c[3] }; }));
  }
  function draftPhieu(o) {
    var vb = C.VAN_BAN[o.loai], m = extractMeta(o.text), checks = runChecks(o.loai, o.text);
    var fail = checks.filter(function (c) { return !c.ok; }), f = [];
    var len = o.text.trim().length;
    if (!len) f.push("Chưa có nội dung văn bản để đối chiếu.");
    else if (len < 400) f.push("Văn bản quá ngắn — có thể là bản scan chưa có lớp chữ. Dùng mục «Nhận dạng chữ PDF» rồi dán lại.");
    fail.forEach(function (c) { f.push(c.title + ": " + c.note); });
    if (!fail.length && len >= 400) f.push("Hình thức cơ bản đủ dấu hiệu. Vẫn cần đọc nhận định — quyết định để phát hiện mâu thuẫn, sai điều luật, sai số liệu.");
    return [
      "PHIẾU KIỂM SÁT VĂN BẢN TƯ PHÁP", C.ORG, "Lĩnh vực: " + o.linhVucTen, "",
      "Loại văn bản: " + vb.label,
      "File / nguồn: " + (o.fileName || "dán trực tiếp"),
      "Ngày nhận để kiểm sát: " + (o.ngayNhan || "chưa nhập"),
      "Số, ký hiệu nhận diện: " + (m.soKyHieu || "—"),
      "Ngày ban hành nhận diện: " + (m.ngayBanHanh || "—"),
      "Cơ quan ban hành nhận diện: " + (m.coQuan || "—"), "",
      "I. Đối chiếu hình thức và nội dung chuyên ngành",
      checks.map(function (c) { return "- [" + (c.ok ? "x" : " ") + "] " + c.title + " — " + c.note; }).join("\n"), "",
      "II. Nội dung cần lưu ý", f.map(function (x, i) { return (i + 1) + ". " + x; }).join("\n"), "",
      "III. Hướng xử lý gợi ý",
      fail.length ? "- Thiếu hoặc chưa rõ các mục trên: yêu cầu giải trình / kiến nghị bổ sung, đính chính." : "- Hình thức tạm đủ. Sai pháp luật ảnh hưởng quyền → kháng nghị; sai sót ít nghiêm trọng → kiến nghị.",
      "- Ghi sổ kiểm sát ngay khi nhận văn bản.", "",
      "IV. Căn cứ tham chiếu của lĩnh vực: " + o.canCu,
      "Công cụ hỗ trợ nghiệp vụ — không thay thế đối chiếu văn bản gốc và ý kiến lãnh đạo Viện."
    ].join("\n");
  }
  function answerLocal(q, loai) {
    q = q.toLowerCase();
    if (/chào|hello|\bhi\b/.test(q)) return "Chào bạn. Bạn chọn loại văn bản, tải hoặc dán nội dung, rồi bấm Kiểm sát.";
    for (var i = 0; i < C.FAQ.length; i++) if (C.FAQ[i][0].test(q)) return C.FAQ[i][1];
    return "Với " + C.VAN_BAN[loai].label + ", bạn tải hoặc dán văn bản rồi bấm Kiểm sát để lập phiếu. Kết luận cuối cùng do Kiểm sát viên đối chiếu văn bản gốc.";
  }
  function systemPrompt(lv) {
    return "Bạn là trợ lý ảo kiểm sát văn bản tư pháp của " + C.ORG + ", lĩnh vực: " + lv.ten +
      ". Căn cứ tham chiếu: " + lv.canCu + ". Xưng hô «bạn». Rà hình thức, chính tả tên người/số liệu, mâu thuẫn nhận định — quyết định, thiếu căn cứ, sai thẩm quyền, sai thời hạn. " +
      "Trả lời bằng Phiếu kiểm sát: I. Tóm tắt; II. Vi phạm / thiếu sót; III. Căn cứ pháp luật; IV. Hướng xử lý (ghi nhận / kiến nghị / kháng nghị); V. Lưu ý. " +
      "Không bịa điều luật; không chắc thì ghi «cần đối chiếu văn bản gốc». Tiếng Việt, giọng nghiệp vụ, ngắn.";
  }
  K.core = { extractMeta: extractMeta, runChecks: runChecks, draftPhieu: draftPhieu, answerLocal: answerLocal, systemPrompt: systemPrompt };

  /* ---------------- AI tuỳ chọn (mặc định TẮT; key của người dùng lưu trên máy) ---------------- */
  var AI_LS = "knks.ai.v2";
  var PROVIDERS = {
    groq: { ten: "Groq — khuyến nghị (không dùng dữ liệu để huấn luyện)", url: "https://api.groq.com/openai/v1/chat/completions",
      model: "qwen/qwen3.8-27b", keyUrl: "https://console.groq.com/keys", maxChars: 9000, canhBao: "" },
    gemini: { ten: "Google Gemini — tuỳ chọn", url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      model: "gemini-3.5-flash-lite", keyUrl: "https://aistudio.google.com/apikey", maxChars: 30000,
      canhBao: "⚠ Bản miễn phí của Google Gemini dùng dữ liệu bạn gửi (văn bản, câu hỏi, câu trả lời) để huấn luyện và cải thiện sản phẩm; nhân viên Google có thể đọc. Tuyệt đối không gửi văn bản chưa ẩn danh hoặc tài liệu mật." }
  };
  function proxyUrl() { return ((C.AI && C.AI.PROXY_URL) || "").trim(); }
  function aiCfg() {
    var c; try { c = JSON.parse(localStorage.getItem(AI_LS) || "{}"); } catch (e) { c = {}; }
    if (!PROVIDERS[c.provider]) c.provider = "groq";
    return c;
  }
  function saveAiCfg(c) { localStorage.setItem(AI_LS, JSON.stringify(c)); }
  function clean(s) { return String(s || "").replace(/<think>[\s\S]*?<\/think>\s*/g, "").trim(); }
  function aiErr(msg, code) { var e = new Error(msg); e.code = code; return e; }
  function readJson(r) { return r.text().then(function (s) { try { return JSON.parse(s); } catch (e) { return {}; } }); }
  // Gọi máy chủ trung gian (Cloudflare Worker). Định dạng: POST {system, messages, max_tokens, temperature}
  // → {provider, source, model, content}. Lỗi: {error}, 429 = hết lượt dùng chung.
  function callProxy(cfg, sys, user) {
    var key = (cfg.key || "").trim(), h = { "Content-Type": "application/json" }, body = { system: sys, messages: [{ role: "user", content: user }], max_tokens: 2048, temperature: 0.2 };
    if (key) { h["X-User-Provider"] = cfg.provider; h["X-User-Api-Key"] = key; if ((cfg.model || "").trim()) body.model = cfg.model.trim(); }
    return fetch(proxyUrl(), { method: "POST", headers: h, body: JSON.stringify(body) }).then(function (r) {
      return readJson(r).then(function (d) {
        if (r.status === 429) throw aiErr(d.error || "Hết lượt dùng chung", 429);
        if (!r.ok) throw aiErr(d.error || "HTTP " + r.status, r.status);
        if (!d.content) throw aiErr("AI không trả lời", 502);
        return { content: clean(d.content), via: d.source === "byok" ? "key riêng qua máy chủ trung gian" : "lượt dùng chung của Viện", model: d.model || "" };
      });
    });
  }
  // Gọi thẳng nhà cung cấp OpenAI-compatible bằng key riêng của người dùng.
  function callDirect(cfg, sys, user) {
    var pv = PROVIDERS[cfg.provider] || PROVIDERS.groq, model = (cfg.model || "").trim() || pv.model;
    return fetch(pv.url, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + cfg.key.trim() },
      body: JSON.stringify({ model: model, temperature: 0.2, max_tokens: 2048, messages: [{ role: "system", content: sys }, { role: "user", content: user }] })
    }).then(function (r) { return readJson(r).then(function (d) {
      if (!r.ok) throw aiErr((d.error && (d.error.message || d.error)) || "HTTP " + r.status, r.status);
      var t = d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
      if (!t) throw aiErr("AI không trả lời", 502);
      return { content: clean(t), via: "key riêng của bạn", model: d.model || model };
    }); });
  }
  // Thứ tự: key riêng (gọi thẳng; lỗi mạng/CORS thì thử qua proxy kèm key) → lượt dùng chung qua proxy.
  function callAI(cfg, sys, user) {
    var key = (cfg.key || "").trim(), proxy = proxyUrl();
    if (key) {
      return callDirect(cfg, sys, user).catch(function (e) {
        if (e.code === 401 || e.code === 403) throw aiErr("Khoá API của bạn bị từ chối — kiểm tra lại key.", 401);
        if (!proxy) throw e;
        return callProxy(cfg, sys, user).catch(function (e2) {
          if (e2.code === 401) throw aiErr("Khoá API của bạn bị từ chối — kiểm tra lại key.", 401);
          return callProxy({ provider: cfg.provider }, sys, user);
        });
      });
    }
    if (!proxy) return Promise.reject(aiErr("chưa nhập API key", 0));
    return callProxy(cfg, sys, user);
  }
  K.ai = { PROVIDERS: PROVIDERS, cfg: aiCfg, call: callAI, callProxy: callProxy, proxyUrl: proxyUrl };

  /* ---------------- giao diện Trợ lý ảo ---------------- */
  K.mountTroLy = function (host, linhVucId) {
    injectCss();
    var lv = C.LINH_VUC[linhVucId] || C.LINH_VUC["tong-hop"];
    var loai = lv.vanBan[0], fileName = "", uid = "knai" + Math.random().toString(36).slice(2, 7);
    host.classList.add("knai");
    host.innerHTML =
      '<div class="card"><p class="kicker">Trợ lý ảo Kiểm sát văn bản tư pháp · ' + esc(lv.ten) + '</p>' +
      '<p class="muted">Mặc định chạy trên máy, không gửi dữ liệu ra ngoài (trừ khi bạn tự bật AI). Căn cứ tham chiếu: ' + esc(lv.canCu) + '. Nên che CCCD, địa chỉ chi tiết trước khi dán (mục «Tự động che thông tin»).</p></div>' +
      '<div class="grid g2"><div class="card"><p class="kicker">1. Loại văn bản</p><div class="row" data-k="loai"></div>' +
      '<p class="muted" data-k="hint" style="margin-top:8px"></p><label>Ngày nhận văn bản</label><input type="date" data-k="ngay" />' +
      '<div class="row"><button class="btn" type="button" data-k="btnFile">Tải PDF, DOCX, TXT</button><input type="file" data-k="file" accept=".pdf,.docx,.txt,.md" hidden /></div>' +
      '<p class="muted" data-k="fname"></p><label>Nội dung văn bản</label><textarea data-k="vanban" placeholder="Dán nội dung tại đây nếu không tải file…"></textarea>' +
      '<div class="row"><button class="btn" type="button" data-k="btnKs" style="background:var(--navy);color:#fff;border-color:var(--navy)">Kiểm sát</button>' +
      '<label class="muted" style="display:flex;gap:6px;align-items:center;margin:0"><input type="checkbox" data-k="useAi" style="width:auto;min-height:0" /> Dùng thêm AI (tuỳ chọn, cần mạng)</label></div>' +
      '<div data-k="aiPanel" hidden><div class="knai-note"><strong>Lưu ý trước khi gửi cho AI:</strong> nội dung sẽ được gửi tới máy chủ nhà cung cấp AI ở nước ngoài. Chỉ gửi văn bản <strong>đã ẩn danh</strong> (che họ tên, ngày sinh, CCCD, địa chỉ, số tài khoản… — dùng mục «Tự động che thông tin»), không gửi tài liệu mật. Kết quả AI chỉ để tham khảo, có thể sai; Kiểm sát viên phải đối chiếu văn bản gốc. Xem <a href="../../privacy.html" target="_blank" rel="noopener">Chính sách dữ liệu</a>.</div>' +
      '<label style="display:flex;gap:8px;align-items:flex-start;margin-top:8px"><input type="checkbox" data-k="aiOk" style="width:auto;min-height:0;margin-top:3px" /> <span>Tôi xác nhận văn bản đã được ẩn danh, không chứa bí mật nhà nước, và tôi hiểu kết quả AI chỉ để tham khảo.</span></label>' +
      '<details data-k="aiBox" style="margin-top:8px"><summary class="muted">Cài đặt AI</summary>' +
      '<label>Nhà cung cấp</label><select data-k="aiProv"></select><div class="knai-note" data-k="aiWarn" hidden></div>' +
      '<label>Model (để trống = mặc định)</label><input data-k="aiModel" autocomplete="off" />' +
      '<label>API key của bạn (<a data-k="aiKeyUrl" target="_blank" rel="noopener">lấy key miễn phí</a>) — chỉ lưu trên trình duyệt này</label><input type="password" data-k="aiKey" autocomplete="off" />' +
      '<p class="muted" data-k="aiProxy"></p>' +
      '<div class="row"><button class="btn" type="button" data-k="aiSave">Lưu cài đặt</button><button class="btn" type="button" data-k="aiDel">Xoá key</button></div></details></div>' +
      '</div><div class="card" style="display:flex;flex-direction:column"><p class="kicker">Phiếu kiểm sát · xưng hô «bạn»</p>' +
      '<div class="knai-chat" data-k="chat"></div><div class="row no-print"><input data-k="q" placeholder="Câu hỏi thêm…" style="flex:1" />' +
      '<button class="btn" type="button" data-k="send">Gửi</button><button class="btn" type="button" data-k="copy">Chép</button></div></div></div>';
    function $(k) { return host.querySelector('[data-k="' + k + '"]'); }
    function add(role, t) { var d = document.createElement("div"); d.className = "knai-msg " + role; d.textContent = t; $("chat").appendChild(d); $("chat").scrollTop = 1e9; return d; }
    function renderLoai() {
      $("loai").innerHTML = lv.vanBan.map(function (id) { return '<button type="button" class="chip' + (id === loai ? " on" : "") + '" data-loai="' + id + '">' + esc(C.VAN_BAN[id].short) + "</button>"; }).join("");
      $("hint").textContent = C.VAN_BAN[loai].label + ": " + C.VAN_BAN[loai].hint;
    }
    $("loai").addEventListener("click", function (e) { var b = e.target.closest("[data-loai]"); if (b) { loai = b.getAttribute("data-loai"); renderLoai(); } });
    $("ngay").value = today();
    $("btnFile").onclick = function () { $("file").click(); };
    $("file").onchange = function (e) {
      var f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) return;
      fileName = f.name; $("fname").textContent = f.name;
      readFileText(f).then(function (t) { $("vanban").value = t; }).catch(function () { $("fname").textContent = "Không đọc được file. Dán nội dung hoặc dùng TXT/DOCX/PDF có lớp chữ."; });
    };
    $("aiProv").innerHTML = Object.keys(PROVIDERS).map(function (id) { return '<option value="' + id + '">' + esc(PROVIDERS[id].ten) + "</option>"; }).join("");
    function showProv() {
      var pv = PROVIDERS[$("aiProv").value] || PROVIDERS.groq;
      $("aiWarn").hidden = !pv.canhBao; $("aiWarn").textContent = pv.canhBao;
      $("aiKeyUrl").href = pv.keyUrl; $("aiModel").placeholder = pv.model;
    }
    var c0 = aiCfg();
    $("aiProv").value = c0.provider; $("aiKey").value = c0.key || ""; $("aiModel").value = c0.model || ""; showProv();
    $("aiProxy").textContent = proxyUrl() ? "Không cần key: dùng lượt miễn phí chung của Viện qua máy chủ trung gian (8 lượt/phút, 40 lượt/ngày mỗi mạng). Nếu nhập key riêng thì ưu tiên dùng key của bạn, không tốn lượt chung." : "Chưa có máy chủ trung gian: cần nhập API key riêng của bạn.";
    $("aiProv").onchange = showProv;
    $("useAi").onchange = function () { $("aiPanel").hidden = !$("useAi").checked; };
    $("vanban").addEventListener("input", function () { $("aiOk").checked = false; });
    $("aiSave").onclick = function () { saveAiCfg({ provider: $("aiProv").value, model: $("aiModel").value.trim(), key: $("aiKey").value.trim() }); add("bot", "Đã lưu cài đặt AI trên máy này."); };
    $("aiDel").onclick = function () { var c = aiCfg(); delete c.key; saveAiCfg(c); $("aiKey").value = ""; add("bot", "Đã xoá API key khỏi máy này."); };
    function run(ask) {
      var text = $("vanban").value.trim(), q = (ask || "").trim();
      if (!text && !q) return;
      add("me", text ? "Kiểm sát " + C.VAN_BAN[loai].label + (fileName ? " — " + fileName : "") + (q ? "\n" + q : "") : q);
      $("q").value = "";
      var local = text ? draftPhieu({ loai: loai, text: text, ngayNhan: $("ngay").value, fileName: fileName, linhVucTen: lv.ten, canCu: lv.canCu }) : answerLocal(q, loai);
      add("bot", local);
      if (!$("useAi").checked) return;
      if (!$("aiOk").checked) { add("bot", "Chưa gửi cho AI: bạn cần tích ô xác nhận văn bản đã được ẩn danh."); return; }
      var cfg = { provider: $("aiProv").value, model: $("aiModel").value.trim(), key: $("aiKey").value.trim() || aiCfg().key || "" };
      if (!cfg.key && !proxyUrl()) { add("bot", "Chưa gửi cho AI: hãy nhập API key trong «Cài đặt AI»."); $("aiBox").open = true; return; }
      if (g.navigator.onLine === false) { add("bot", "Máy đang mất mạng — chỉ dùng được kết quả kiểm tra trên máy."); return; }
      var pv = PROVIDERS[cfg.key ? cfg.provider : "groq"];
      var wait = add("bot", "AI đang phân tích…");
      var user = (text ? "Loại văn bản: " + C.VAN_BAN[loai].label + "\nPhiếu kiểm tra tự động:\n" + local + "\n\nNỘI DUNG VĂN BẢN (đã ẩn danh):\n" + text.slice(0, pv.maxChars) : "") + (q ? "\n\nCÂU HỎI: " + q : "");
      callAI(cfg, systemPrompt(lv), user).then(function (r) { wait.textContent = "[AI — chỉ để tham khảo, cần đối chiếu văn bản gốc · " + r.via + (r.model ? " · " + r.model : "") + "]\n" + r.content; })
        .catch(function (e) {
          if (e.code === 429) { wait.textContent = "Đã hết lượt AI miễn phí dùng chung (giới hạn 8 lượt/phút, 40 lượt/ngày). Bạn thử lại sau ít phút, hoặc nhập API key riêng (Groq miễn phí, không dùng dữ liệu để huấn luyện) trong «Cài đặt AI» để dùng tiếp. Kết quả kiểm tra trên máy ở trên vẫn dùng được."; $("aiBox").open = true; return; }
          if (e.code === 413) { wait.textContent = "Văn bản quá dài cho AI. Hãy rút gọn (chỉ dán phần cần hỏi) rồi thử lại."; return; }
          wait.textContent = "Không gọi được AI (" + e.message + "). Dùng kết quả kiểm tra trên máy ở trên.";
        });
    }
    $("btnKs").onclick = function () { run(""); };
    $("send").onclick = function () { run($("q").value); };
    $("q").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); run($("q").value); } });
    $("copy").onclick = function () { var all = host.querySelectorAll(".knai-msg.bot"); if (all.length && navigator.clipboard) navigator.clipboard.writeText(all[all.length - 1].textContent); };
    add("bot", "Trợ lý ảo Kiểm sát văn bản tư pháp — " + lv.ten + ".\n1. Chọn loại văn bản.\n2. Tải file hoặc dán nội dung.\n3. Nhập ngày nhận rồi bấm Kiểm sát.");
    renderLoai();
  };

  /* ---------------- gắn 2 tab vào trang kỹ năng ---------------- */
  // opts: { linhVuc, tabs:"#tabs", troLy:true, soanQd:true }
  K.attach = function (opts) {
    opts = opts || {};
    var tabs = document.querySelector(opts.tabs || "#tabs");
    if (!tabs) { console.warn("KNKS.attach: không thấy thanh tab"); return; }
    var panes = tabs.parentNode.querySelectorAll('[id^="pane-"]');
    var anchor = panes.length ? panes[panes.length - 1] : tabs;
    var defs = [];
    if (opts.troLy !== false) defs.push({ tab: "troly", label: "Trợ lý ảo kiểm sát VB", mount: K.mountTroLy });
    if (opts.soanQd !== false && K.mountSoanQd) defs.push({ tab: "soanqd", label: "Soạn QĐ phân công KSV", mount: K.mountSoanQd });
    defs.forEach(function (d) {
      var b = document.createElement("button"); b.type = "button"; b.className = "tab"; b.setAttribute("data-tab", d.tab); b.textContent = d.label;
      tabs.appendChild(b);
      var p = document.createElement("div"); p.id = "pane-" + d.tab; p.className = "hide";
      anchor.parentNode.insertBefore(p, anchor.nextSibling); anchor = p; d.pane = p;
    });
    function sync() {
      defs.forEach(function (d) {
        var on = !!tabs.querySelector('[data-tab="' + d.tab + '"].on');
        d.pane.classList.toggle("hide", !on);
        if (on && !d.mounted) { d.mounted = true; d.mount(d.pane, opts.linhVuc); }
      });
    }
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tab]"); if (!b) return;
      var t = b.getAttribute("data-tab");
      // Trang gốc chỉ biết các tab cũ: tự bật/tắt nút & ẩn pane cũ khi chọn tab mới.
      if (defs.some(function (d) { return d.tab === t; })) {
        tabs.querySelectorAll("[data-tab]").forEach(function (x) { x.classList.toggle("on", x === b); });
        tabs.parentNode.querySelectorAll('[id^="pane-"]').forEach(function (p) { p.classList.add("hide"); });
      }
      setTimeout(sync, 0);
    });
    new MutationObserver(sync).observe(tabs, { subtree: true, attributes: true, attributeFilter: ["class"] });
    var h = (location.hash || "").replace("#", "");
    if (h === "troly" || h === "soanqd") { var hb = tabs.querySelector('[data-tab="' + h + '"]'); if (hb) hb.click(); }
  };
})(window);
