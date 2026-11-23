/* PDF/ảnh → Markdown trên trình duyệt: pdf.js trích lớp chữ, Tesseract.js (tiếng Việt) OCR trang scan. */
(function () {
  "use strict";
  var C = window.CongCu, $ = function (id) { return document.getElementById(id); };
  var results = [], current = -1, stop = false;

  function status(t, pct) { $("status").textContent = t || ""; if (pct != null) $("bar").style.width = Math.max(0, Math.min(100, pct)) + "%"; }
  function median(a) { if (!a.length) return 0; a = a.slice().sort(function (x, y) { return x - y; }); return a[a.length >> 1]; }

  function pageToMd(content) {
    var items = content.items.filter(function (it) { return it.str != null; });
    var lines = [], cur = null;
    items.forEach(function (it) {
      var y = it.transform[5], h = Math.abs(it.transform[3]) || it.height || 10, x = it.transform[4];
      if (!cur || Math.abs(cur.y - y) > h * 0.5) { cur = { y: y, h: h, parts: [] }; lines.push(cur); }
      cur.parts.push({ x: x, s: it.str, w: it.width || 0 }); cur.h = Math.max(cur.h, h);
      if (it.hasEOL) cur = null;
    });
    var med = median(lines.map(function (l) { return l.h; }));
    var out = [], prevY = null, prevH = med;
    lines.forEach(function (l) {
      l.parts.sort(function (a, b) { return a.x - b.x; });
      var txt = "", end = null;
      l.parts.forEach(function (p) { if (end != null && p.x - end > l.h * 0.25 && !/\s$/.test(txt) && !/^\s/.test(p.s)) txt += " "; txt += p.s; end = p.x + p.w; });
      txt = txt.replace(/\s+/g, " ").trim();
      if (!txt) return;
      var gap = prevY == null ? 0 : Math.abs(prevY - l.y);
      if (prevY != null && gap > Math.max(prevH, l.h) * 1.8) out.push("");
      if (med && l.h >= med * 1.35 && txt.length < 120) { if (out.length && out[out.length - 1] !== "") out.push(""); out.push((l.h >= med * 1.7 ? "# " : "## ") + txt); out.push(""); }
      else out.push(txt);
      prevY = l.y; prevH = l.h;
    });
    return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  async function ocrCanvas(canvas, label) {
    var w = await C.tesseract(function (m) {
      if (m.status === "recognizing text") status(label + " — đang nhận dạng chữ " + Math.round(m.progress * 100) + "%");
      else if (/load|initializ/i.test(m.status)) status("Đang nạp bộ nhận dạng tiếng Việt… " + Math.round((m.progress || 0) * 100) + "%");
    });
    var r = await w.recognize(canvas);
    return (r.data.text || "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  async function doPdf(file, r) {
    var pdfjs = await C.pdfjs(), doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise, parts = [], ocrPages = 0;
    for (var i = 1; i <= doc.numPages; i++) {
      if (stop) throw new Error("Đã dừng");
      status(file.name + " — trang " + i + "/" + doc.numPages, 100 * (i - 1) / doc.numPages);
      var page = await doc.getPage(i), md = pageToMd(await page.getTextContent());
      if ((md.replace(/\s/g, "").length < 20 || $("optForce").checked) && $("optOcr").checked) {
        var vp = page.getViewport({ scale: 2 }), cv = document.createElement("canvas");
        cv.width = vp.width; cv.height = vp.height;
        await page.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
        md = await ocrCanvas(cv, file.name + " — trang " + i + "/" + doc.numPages); ocrPages++;
        cv.width = cv.height = 0;
      }
      parts.push("<!-- Trang " + i + " -->\n\n" + (md || "_(trang không có chữ)_"));
      r.note = i + "/" + doc.numPages + " trang" + (ocrPages ? ", OCR " + ocrPages : ""); render();
    }
    return parts.join("\n\n");
  }
  async function doImage(file) {
    var img = await createImageBitmap(file), cv = document.createElement("canvas"), s = Math.min(1, 3000 / Math.max(img.width, img.height));
    cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
    cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
    return ocrCanvas(cv, file.name);
  }
  function render() {
    $("outCard").hidden = !results.length;
    $("rows").innerHTML = results.map(function (r, i) {
      var st = r.err ? '<span class="badge err">' + C.esc(r.err) + "</span>" : r.md != null ? '<span class="badge">Xong · ' + C.esc(r.note || "") + "</span>" : '<span class="badge warn">' + C.esc(r.note || "Chờ xử lý") + "</span>";
      return "<tr><td>" + C.esc(r.name) + "</td><td>" + st + "</td><td>" + (r.md != null ? '<button class="btn btn-ghost" type="button" data-i="' + i + '">Xem</button>' : "") + "</td></tr>";
    }).join("");
    $("btnDl").textContent = results.filter(function (r) { return r.md != null; }).length > 1 ? "Tải .md (.zip)" : "Tải .md";
  }
  function show(i) { current = i; $("preview").textContent = results[i] && results[i].md || ""; }
  async function handle(files) {
    stop = false; results = files.map(function (f) { return { name: f.name, file: f }; }); current = -1; render();
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      try {
        if (/\.pdf$/i.test(r.name) || r.file.type === "application/pdf") r.md = await doPdf(r.file, r);
        else if (/^image\//.test(r.file.type)) { if (!$("optOcr").checked) throw new Error("Cần bật OCR để đọc ảnh"); r.md = await ocrCanvasSafe(r); r.note = "OCR ảnh"; }
        else throw new Error("Chỉ hỗ trợ PDF, JPG, PNG");
        r.md = "# " + C.baseName(r.name) + "\n\n" + r.md.trim() + "\n";
        if (current < 0) show(i);
      } catch (e) { r.err = e.message || "Lỗi xử lý"; if (stop) break; }
      render();
    }
    status(stop ? "Đã dừng." : "Hoàn tất.", 100);
  }
  function ocrCanvasSafe(r) { return doImage(r.file); }
  $("btnPick").onclick = function () { $("file").click(); };
  $("file").onchange = function (e) { var f = [].slice.call(e.target.files || []); e.target.value = ""; if (f.length) handle(f); };
  C.setupDrop($("drop"), handle);
  $("btnStop").onclick = function () { stop = true; };
  $("rows").onclick = function (e) { var b = e.target.closest("[data-i]"); if (b) show(+b.getAttribute("data-i")); };
  $("btnCopy").onclick = function () { var t = $("preview").textContent; if (t && navigator.clipboard) navigator.clipboard.writeText(t); };
  function dl(ext) {
    var ok = results.filter(function (r) { return r.md != null; }); if (!ok.length) return;
    var conv = function (md) { return ext === "txt" ? md.replace(/<!-- (Trang \d+) -->/g, "--- $1 ---").replace(/^#+ /gm, "") : md; };
    if (ok.length === 1) return C.download(new Blob([conv(ok[0].md)], { type: "text/plain;charset=utf-8" }), C.baseName(ok[0].name) + "." + ext);
    C.jszip().then(function (JSZip) { var z = new JSZip(); ok.forEach(function (r) { z.file(C.baseName(r.name) + "." + ext, conv(r.md)); }); return z.generateAsync({ type: "blob" }); })
      .then(function (b) { C.download(b, "PdfToMd_" + ext + ".zip"); });
  }
  $("btnDl").onclick = function () { dl("md"); };
  $("btnTxt").onclick = function () { dl("txt"); };
  window.PdfToMd = { pageToMd: pageToMd };
})();
