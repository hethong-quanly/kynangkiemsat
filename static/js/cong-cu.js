/* Tiện ích dùng chung cho các công cụ chạy trên trình duyệt — xử lý hoàn toàn trên máy người dùng. */
(function (g) {
  "use strict";
  var s = document.currentScript && document.currentScript.src;
  var VENDOR = s ? new URL("../vendor/", s).href : "../../static/vendor/";
  var loaded = {};
  function loadScript(src) {
    if (!loaded[src]) loaded[src] = new Promise(function (ok, fail) {
      var el = document.createElement("script"); el.src = src; el.onload = ok;
      el.onerror = function () { delete loaded[src]; fail(new Error("Không tải được " + src)); };
      document.head.appendChild(el);
    });
    return loaded[src];
  }
  function esc(x) { return String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function download(blob, name) {
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  function jszip() { return loadScript(VENDOR + "jszip.min.js").then(function () { return g.JSZip; }); }
  function pdfjs() {
    return loadScript(VENDOR + "pdfjs/pdf.min.js").then(function () {
      g.pdfjsLib.GlobalWorkerOptions.workerSrc = VENDOR + "pdfjs/pdf.worker.min.js"; return g.pdfjsLib;
    });
  }
  var ocrWorker = null;
  function tesseract(onProgress) {
    if (ocrWorker) return ocrWorker;
    ocrWorker = loadScript(VENDOR + "tesseract/tesseract.min.js").then(function () {
      return g.Tesseract.createWorker("vie", 1, {
        workerPath: VENDOR + "tesseract/worker.min.js",
        corePath: VENDOR + "tesseract/",
        langPath: VENDOR + "tesseract/",
        workerBlobURL: false,
        gzip: true,
        logger: function (m) { if (onProgress) onProgress(m); }
      });
    }).catch(function (e) { ocrWorker = null; throw e; });
    return ocrWorker;
  }
  function baseName(n) { return n.replace(/\.[^.]+$/, ""); }
  function setupDrop(zone, onFiles) {
    ["dragenter", "dragover"].forEach(function (ev) { zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add("on"); }); });
    ["dragleave", "drop"].forEach(function (ev) { zone.addEventListener(ev, function () { zone.classList.remove("on"); }); });
    zone.addEventListener("drop", function (e) { e.preventDefault(); var f = e.dataTransfer && e.dataTransfer.files; if (f && f.length) onFiles([].slice.call(f)); });
  }
  g.CongCu = { VENDOR: VENDOR, loadScript: loadScript, esc: esc, download: download, jszip: jszip, pdfjs: pdfjs, tesseract: tesseract, baseName: baseName, setupDrop: setupDrop };
})(window);
