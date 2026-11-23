/* Đổi tên file hàng loạt trên trình duyệt — quy tắc chuyển từ file_renamer.py. */
(function () {
  "use strict";
  var C = window.CongCu, $ = function (id) { return document.getElementById(id); };
  var VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  var SPECIAL = /[^\w\s\-.()[\]_,&+]+/g;
  var ABBR = Object.keys(window.VN_ABBR || {}).filter(function (k) { return window.VN_ABBR[k]; })
    .sort(function (a, b) { return b.length - a.length; })
    .map(function (k) { return [new RegExp("(^|[^A-Za-z0-9_])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![A-Za-z0-9_])", "gi"), window.VN_ABBR[k]]; });
  var items = [], dirHandle = null;

  function noMark(s) { return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D"); }
  function splitExt(n) { var i = n.lastIndexOf("."); return i > 0 ? [n.slice(0, i), n.slice(i)] : [n, ""]; }
  function abbreviate(t) { ABBR.forEach(function (a) { t = t.replace(a[0], function (m, p) { return p + a[1]; }); }); return t.replace(/\s+/g, " ").trim(); }
  function shorten(t, max, useAbbr) {
    if (t.length <= max) return t;
    if (useAbbr) { t = abbreviate(t); if (t.length <= max) return t; }
    t = t.replace(/\b(ngay|thang|nam)\s+\d+\b/gi, "").replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    return t.slice(0, max - 2).replace(/\s+$/, "") + "..";
  }
  function clean(name, max, useAbbr) {
    var se = splitExt(name.normalize("NFC")), s = se[0];
    if (VN.test(s)) s = noMark(s);
    s = s.replace(SPECIAL, "").replace(/\s+/g, " ").trim().replace(/-{2,}/g, "-").replace(/_{2,}/g, "_");
    s = shorten(s, max, useAbbr) || "file";
    return s + se[1].toLowerCase();
  }
  function problems(name, max) {
    var s = splitExt(name)[0], r = [];
    if (VN.test(s)) r.push("Có dấu tiếng Việt");
    if (s.length > max) r.push("Dài " + s.length + " ký tự");
    var sp = noMark(s).match(SPECIAL); if (sp) r.push("Ký tự đặc biệt: " + Array.from(new Set(sp.join(""))).slice(0, 3).join(" "));
    if (/ {2,}/.test(s)) r.push("Nhiều khoảng trắng");
    if (/_{2,}/.test(s)) r.push("Nhiều gạch dưới");
    return r;
  }
  function pad(n, d) { n = String(n); while (n.length < d) n = "0" + n; return n; }
  function compute() {
    var mode = $("mode").value, max = Math.max(20, +$("maxLen").value || 60), ab = $("abbr").checked, only = $("onlyBad").checked;
    var k = +$("start").value || 0, d = Math.max(1, +$("digits").value || 3), pre = $("prefix").value.trim();
    var taken = {};
    items.forEach(function (it) {
      var why = problems(it.name, max), nn = it.name;
      if (mode === "clean") { nn = (only && !why.length) ? it.name : clean(it.name, max, ab); }
      else {
        var base = mode === "both" ? clean(it.name, max, ab) : it.name;
        nn = (pre ? pre : "") + pad(k++, d) + "_" + base; why = ["Đánh số"].concat(mode === "both" ? why : []);
      }
      var key = (it.dir + "/" + nn).toLowerCase(), se = splitExt(nn), j = 1;
      while (taken[key]) { nn = se[0] + "_" + j++ + se[1]; key = (it.dir + "/" + nn).toLowerCase(); }
      taken[key] = 1; it.newName = nn; it.why = why; it.changed = nn !== it.name;
      if (it.sel == null) it.sel = true;
    });
    render();
  }
  function render() {
    $("outCard").hidden = !items.length;
    var ch = items.filter(function (i) { return i.changed; });
    $("count").textContent = "· " + items.length + " tệp, " + ch.length + " tệp đổi tên";
    $("rows").innerHTML = items.map(function (it, i) {
      return "<tr><td><input type=\"checkbox\" data-i=\"" + i + "\"" + (it.sel ? " checked" : "") + (it.changed ? "" : " disabled") + ' style="width:auto;min-height:0" /></td><td class="old">' + C.esc((it.dir ? it.dir + "/" : "") + it.name) +
        '</td><td class="new">' + (it.changed ? C.esc(it.newName) : '<span class="muted">giữ nguyên</span>') + '</td><td class="muted">' + C.esc((it.why || []).join("; ")) + "</td></tr>";
    }).join("");
    [].forEach.call(document.querySelectorAll(".num"), function (el) { el.style.display = $("mode").value === "clean" ? "none" : ""; });
    $("btnGo").textContent = dirHandle ? "Đổi tên trong thư mục" : "Tải các tệp đã đổi tên (.zip)";
  }
  function setFiles(list, viaDir) {
    dirHandle = viaDir || null;
    items = list.map(function (x) {
      var rel = x.path || x.file.webkitRelativePath || "", parts = rel.split("/"); parts.pop();
      return { file: x.file, handle: x.handle, parent: x.parent, name: x.file ? x.file.name : x.name, dir: parts.join("/") };
    });
    compute();
  }
  async function walk(dir, path, out) {
    for await (var entry of dir.values()) {
      if (entry.kind === "file") out.push({ handle: entry, parent: dir, name: entry.name, path: (path ? path + "/" : "") + entry.name });
      else if (out.length < 5000) await walk(entry, (path ? path + "/" : "") + entry.name, out);
    }
    return out;
  }
  async function renameInDir() {
    var todo = items.filter(function (i) { return i.sel && i.changed; }), done = 0, fail = 0;
    $("prog").hidden = false;
    for (var it of todo) {
      try {
        if (it.handle.move) await it.handle.move(it.newName);
        else {
          var f = await it.handle.getFile(), nh = await it.parent.getFileHandle(it.newName, { create: true }), w = await nh.createWritable();
          await w.write(f); await w.close(); await it.parent.removeEntry(it.name);
        }
        it.name = it.newName; done++;
      } catch (e) { fail++; it.why = ["Lỗi: " + (e.message || e.name)]; }
      $("prog").firstElementChild.style.width = Math.round(100 * (done + fail) / todo.length) + "%";
    }
    $("msg").textContent = "Đã đổi tên " + done + " tệp" + (fail ? ", lỗi " + fail + " tệp" : "") + ".";
    compute();
  }
  async function zipAll() {
    var JSZip = await C.jszip(), z = new JSZip(), sel = items.filter(function (i) { return i.sel || !i.changed; });
    sel.forEach(function (it) { z.file((it.dir ? it.dir + "/" : "") + (it.sel && it.changed ? it.newName : it.name), it.file); });
    $("prog").hidden = false;
    var blob = await z.generateAsync({ type: "blob", compression: "STORE" }, function (m) { $("prog").firstElementChild.style.width = m.percent.toFixed(0) + "%"; });
    C.download(blob, "Tep_da_doi_ten.zip");
    $("msg").textContent = "Đã tạo tệp .zip gồm " + sel.length + " tệp (tên mới). Tệp gốc trên máy không bị thay đổi.";
  }
  function csv() {
    var rows = [["Thu muc", "Ten cu", "Ten moi", "Ly do"]].concat(items.filter(function (i) { return i.changed; }).map(function (i) { return [i.dir, i.name, i.newName, (i.why || []).join("; ")]; }));
    var t = "\ufeff" + rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(","); }).join("\r\n");
    C.download(new Blob([t], { type: "text/csv;charset=utf-8" }), "doi_chieu_ten_file.csv");
  }
  $("btnFiles").onclick = function () { $("file").click(); };
  $("btnFolder").onclick = function () { $("folder").click(); };
  $("file").onchange = $("folder").onchange = function (e) { var f = [].slice.call(e.target.files || []); e.target.value = ""; if (f.length) setFiles(f.map(function (x) { return { file: x }; })); };
  C.setupDrop($("drop"), function (f) { setFiles(f.map(function (x) { return { file: x }; })); });
  if (window.showDirectoryPicker && window.isSecureContext && !/Android|iPhone|iPad/i.test(navigator.userAgent)) {
    $("btnDir").hidden = false; $("dirNote").hidden = false;
    $("btnDir").onclick = async function () {
      try { var d = await window.showDirectoryPicker({ mode: "readwrite" }); setFiles(await walk(d, "", []), d); }
      catch (e) { if (e.name !== "AbortError") alert("Không mở được thư mục: " + e.message); }
    };
  }
  ["mode", "maxLen", "prefix", "start", "digits", "onlyBad", "abbr"].forEach(function (id) { $(id).addEventListener("input", compute); $(id).addEventListener("change", compute); });
  $("rows").onchange = function (e) { var c = e.target.closest("[data-i]"); if (c) items[+c.getAttribute("data-i")].sel = c.checked; };
  $("all").onchange = function () { items.forEach(function (i) { i.sel = $("all").checked; }); render(); };
  $("btnCsv").onclick = csv;
  $("btnGo").onclick = function () {
    if (!items.some(function (i) { return i.sel && i.changed; })) { $("msg").textContent = "Không có tệp nào cần đổi tên."; return; }
    (dirHandle ? renameInDir() : zipAll()).catch(function (e) { $("msg").textContent = "Lỗi: " + e.message; });
  };
  window.FileRenamer = { clean: clean, problems: problems };
})();
