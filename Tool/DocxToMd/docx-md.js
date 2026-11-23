/* Chuyển .docx → Markdown trên trình duyệt (JSZip + DOMParser). */
(function () {
  "use strict";
  var C = window.CongCu, $ = function (id) { return document.getElementById(id); };
  var W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  var results = [], current = -1;

  function kids(el, name) { var o = []; for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 1 && n.localName === name) o.push(n); return o; }
  function kid(el, name) { return kids(el, name)[0] || null; }
  function attr(el, name) { return el ? (el.getAttributeNS(W, name) || el.getAttribute("w:" + name)) : null; }
  function on(el) { if (!el) return false; var v = attr(el, "val"); return v == null || !/^(0|false|none)$/i.test(v); }

  function parseStyles(xml) {
    var map = {};
    if (!xml) return map;
    var d = new DOMParser().parseFromString(xml, "application/xml");
    [].forEach.call(d.getElementsByTagNameNS(W, "style"), function (s) {
      var id = attr(s, "styleId"), nm = attr(kid(s, "name"), "val") || "";
      var lvl = 0, m = /^(heading|tiêu đề|tieu de|title)\s*(\d)?$/i.exec(nm.trim()) || /^Heading(\d)$/i.exec(id || "");
      if (m) lvl = /title/i.test(nm) ? 1 : parseInt(m[2] || m[1], 10) || 1;
      var ol = kid(kid(s, "pPr") || s, "outlineLvl");
      if (!lvl && ol) lvl = parseInt(attr(ol, "val"), 10) + 1;
      if (lvl) map[id] = Math.min(lvl, 6);
      var snp = kid(kid(s, "pPr") || s, "numPr");
      if (snp) map["list:" + id] = { numId: attr(kid(snp, "numId"), "val"), ilvl: attr(kid(snp, "ilvl"), "val") || "0" };
      else if (/list (bullet|number)/i.test(nm)) map["list:" + id] = { guess: /number/i.test(nm) ? "decimal" : "bullet", ilvl: (/(\d)$/.exec(nm) ? String(+/(\d)$/.exec(nm)[1] - 1) : "0") };
    });
    return map;
  }
  function parseNumbering(xml) {
    var abs = {}, num = {};
    if (!xml) return function () { return "bullet"; };
    var d = new DOMParser().parseFromString(xml, "application/xml");
    [].forEach.call(d.getElementsByTagNameNS(W, "abstractNum"), function (a) {
      var lv = {}; kids(a, "lvl").forEach(function (l) { lv[attr(l, "ilvl")] = attr(kid(l, "numFmt"), "val") || "bullet"; });
      abs[attr(a, "abstractNumId")] = lv;
    });
    [].forEach.call(d.getElementsByTagNameNS(W, "num"), function (n) { num[attr(n, "numId")] = abs[attr(kid(n, "abstractNumId"), "val")] || {}; });
    return function (numId, ilvl) { var l = num[numId]; return (l && l[ilvl]) || "bullet"; };
  }
  function runText(r, fmt) {
    var t = "";
    for (var n = r.firstChild; n; n = n.nextSibling) {
      if (n.nodeType !== 1) continue;
      if (n.localName === "t") t += n.textContent;
      else if (n.localName === "tab") t += "\t";
      else if (n.localName === "br" || n.localName === "cr") t += "  \n";
    }
    if (!fmt || !t.trim()) return t;
    var rp = kid(r, "rPr"), b = on(kid(rp || r, "b")) && rp, i = on(kid(rp || r, "i")) && rp;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(t);
    var core = m[2].replace(/([*_`])/g, "\\$1");
    if (b && i) core = "***" + core + "***"; else if (b) core = "**" + core + "**"; else if (i) core = "*" + core + "*";
    return m[1] + core + m[3];
  }
  function paraText(p, fmt) {
    var out = "";
    (function walk(el) {
      for (var n = el.firstChild; n; n = n.nextSibling) {
        if (n.nodeType !== 1) continue;
        if (n.localName === "r") out += runText(n, fmt);
        else if (/^(hyperlink|ins|smartTag|sdt|sdtContent|fldSimple)$/.test(n.localName)) walk(n);
      }
    })(p);
    return out.replace(/\*\*\*\*|\*\*(\s*)\*\*/g, "$1");
  }
  function cellText(tc, fmt) { return kids(tc, "p").map(function (p) { return paraText(p, fmt).trim(); }).filter(Boolean).join("<br>").replace(/\|/g, "\\|"); }
  function table(tbl, fmt, asTable) {
    var rows = kids(tbl, "tr").map(function (tr) { return kids(tr, "tc").map(function (tc) { return cellText(tc, fmt); }); });
    if (!rows.length) return "";
    if (!asTable) return rows.map(function (r) { return r.join(" — "); }).join("\n\n");
    var w = Math.max.apply(null, rows.map(function (r) { return r.length; }));
    rows = rows.map(function (r) { while (r.length < w) r.push(""); return r; });
    var lines = rows.map(function (r) { return "| " + r.join(" | ") + " |"; });
    lines.splice(1, 0, "|" + new Array(w + 1).join(" --- |"));
    return lines.join("\n");
  }
  function convert(docXml, styles, numFmt, opt) {
    var d = new DOMParser().parseFromString(docXml, "application/xml");
    var body = d.getElementsByTagNameNS(W, "body")[0];
    if (!body) throw new Error("Không thấy nội dung văn bản");
    var blocks = [], counters = {};
    for (var n = body.firstChild; n; n = n.nextSibling) {
      if (n.nodeType !== 1) continue;
      if (n.localName === "tbl") { blocks.push(table(n, opt.fmt, opt.table)); continue; }
      if (n.localName === "sdt") { var c = kid(n, "sdtContent"); if (c) kids(c, "p").forEach(function (p) { blocks.push(paraText(p, opt.fmt)); }); continue; }
      if (n.localName !== "p") continue;
      var pPr = kid(n, "pPr"), sid = attr(kid(pPr || n, "pStyle"), "val"), text = paraText(n, opt.fmt);
      var plain = text.replace(/[*\\]/g, "").trim();
      if (!plain) { blocks.push(""); continue; }
      var lvl = sid && styles[sid];
      var np = pPr && kid(pPr, "numPr");
      if (lvl) { blocks.push(new Array(lvl + 1).join("#") + " " + text.replace(/\*\*/g, "").trim()); continue; }
      var sl = sid && styles["list:" + sid];
      if (np || sl) {
        var id = np ? attr(kid(np, "numId"), "val") : sl.numId, il = parseInt((np && attr(kid(np, "ilvl"), "val")) || (sl && sl.ilvl) || "0", 10);
        if (!id && sl && sl.guess) id = "g-" + sl.guess;
        if (id && id !== "0") {
          var f = /^g-/.test(id) ? id.slice(2) : numFmt(id, String(il)), key = id + ":" + il, ind = new Array(il + 1).join("   ");
          if (f === "bullet" || f === "none") blocks.push(ind + "- " + text.trim());
          else { counters[key] = (counters[key] || 0) + 1; blocks.push(ind + counters[key] + ". " + text.trim()); }
          continue;
        }
      }
      blocks.push(text.trim());
    }
    var md = [], prevList = false;
    blocks.forEach(function (b) {
      var isList = /^\s*(-|\d+\.)\s/.test(b);
      if (b === "") { if (md.length && md[md.length - 1] !== "") md.push(""); prevList = false; return; }
      if (md.length && md[md.length - 1] !== "" && !(isList && prevList)) md.push("");
      md.push(b); prevList = isList;
    });
    return md.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }
  function one(file) {
    if (!/\.docx$/i.test(file.name)) return Promise.reject(new Error(/\.doc$/i.test(file.name) ? "Tệp .doc cũ: hãy lưu lại thành .docx" : "Không phải tệp .docx"));
    return C.jszip().then(function (JSZip) { return JSZip.loadAsync(file); }).then(function (z) {
      var doc = z.file("word/document.xml"); if (!doc) throw new Error("Tệp .docx không hợp lệ");
      var get = function (p) { var f = z.file(p); return f ? f.async("string") : Promise.resolve(null); };
      return Promise.all([doc.async("string"), get("word/styles.xml"), get("word/numbering.xml")]);
    }).then(function (x) {
      return convert(x[0], parseStyles(x[1]), parseNumbering(x[2]), { fmt: $("optFmt").checked, table: $("optTable").checked });
    });
  }
  function show(i) {
    current = i; var r = results[i];
    $("preview").textContent = r && r.md ? r.md : "";
    [].forEach.call($("rows").querySelectorAll("tr"), function (tr, k) { tr.style.background = k === i ? "#f0fdfa" : ""; });
  }
  function render() {
    $("outCard").hidden = !results.length;
    $("rows").innerHTML = results.map(function (r, i) {
      var st = r.err ? '<span class="badge err">' + C.esc(r.err) + "</span>" : r.md ? '<span class="badge">' + r.md.length.toLocaleString("vi") + " ký tự</span>" : '<span class="badge warn">Đang xử lý…</span>';
      return "<tr><td>" + C.esc(r.name) + "</td><td>" + st + "</td><td>" + (r.md ? '<button class="btn btn-ghost" type="button" data-i="' + i + '">Xem</button>' : "") + "</td></tr>";
    }).join("");
    $("btnDl").textContent = results.filter(function (r) { return r.md; }).length > 1 ? "Tải tất cả (.zip)" : "Tải .md";
  }
  function handle(files) {
    results = files.map(function (f) { return { name: f.name, file: f }; }); render();
    var chain = Promise.resolve();
    results.forEach(function (r, i) {
      chain = chain.then(function () { return one(r.file).then(function (md) { r.md = md; }, function (e) { r.err = e.message || "Lỗi đọc tệp"; }); })
        .then(function () { render(); if (current < 0 && r.md) show(i); else show(current); });
    });
    current = -1;
  }
  $("btnPick").onclick = function () { $("file").click(); };
  $("file").onchange = function (e) { var f = [].slice.call(e.target.files || []); e.target.value = ""; if (f.length) handle(f); };
  C.setupDrop($("drop"), handle);
  $("rows").onclick = function (e) { var b = e.target.closest("[data-i]"); if (b) show(+b.getAttribute("data-i")); };
  $("btnCopy").onclick = function () { var t = $("preview").textContent; if (t && navigator.clipboard) navigator.clipboard.writeText(t).then(function () { $("btnCopy").textContent = "Đã chép"; setTimeout(function () { $("btnCopy").textContent = "Sao chép"; }, 1500); }); };
  $("btnDl").onclick = function () {
    var ok = results.filter(function (r) { return r.md; });
    if (!ok.length) return;
    if (ok.length === 1) return C.download(new Blob([ok[0].md], { type: "text/markdown;charset=utf-8" }), C.baseName(ok[0].name) + ".md");
    C.jszip().then(function (JSZip) { var z = new JSZip(); ok.forEach(function (r) { z.file(C.baseName(r.name) + ".md", r.md); }); return z.generateAsync({ type: "blob" }); })
      .then(function (b) { C.download(b, "DocxToMd.zip"); });
  };
  window.DocxToMd = { convert: convert, parseStyles: parseStyles, parseNumbering: parseNumbering, one: one };
})();
