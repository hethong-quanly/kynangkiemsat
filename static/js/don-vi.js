/* Màn hình «Đơn vị công tác»: hiện lần đầu mở app, sửa lại qua nút «Đơn vị công tác».
   Chỉ lưu trên máy (localStorage "knks-don-vi" qua KNKS_DONVI trong theme.js), không gửi đi đâu.
   Nguồn danh sách:
   - 34 đơn vị hành chính cấp tỉnh: Quyết định 19/2025/QĐ-TTg (Bảng danh mục và mã số các ĐVHC Việt Nam, từ 01/7/2025), Nghị quyết 202/2025/QH15.
   - Số VKSND khu vực từng tỉnh: Phụ lục Quyết định 115/QĐ-VKSTC ngày 30/6/2025 (thành lập theo Nghị quyết 84/2025/UBTVQH15); tên dạng «Viện kiểm sát nhân dân khu vực N - <Tỉnh>».
   - VKSND cấp cao: tại Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh.
   Màn hình chào lần đầu có thêm bước chọn ngôn ngữ (Tiếng Việt / English), lưu localStorage "knks_lang". */
(function (g) {
  var D = g.KNKS_DONVI; if (!D) return;
  function T(k, vars) { return (g.KNKS_I18N && g.KNKS_I18N.t) ? g.KNKS_I18N.t(k, vars) : k; }
  function lang() { return (g.KNKS_I18N && g.KNKS_I18N.lang) ? g.KNKS_I18N.lang() : "vi"; }
  // [mã, tên ngắn, số VKSND khu vực]
  var TINH = [["01","Hà Nội",12],["04","Cao Bằng",5],["08","Tuyên Quang",8],["11","Điện Biên",5],["12","Lai Châu",4],["14","Sơn La",6],["15","Lào Cai",9],["19","Thái Nguyên",9],["20","Lạng Sơn",5],["22","Quảng Ninh",6],["24","Bắc Ninh",9],["25","Phú Thọ",17],["31","Hải Phòng",13],["33","Hưng Yên",8],["37","Ninh Bình",11],["38","Thanh Hóa",13],["40","Nghệ An",12],["42","Hà Tĩnh",5],["44","Quảng Trị",8],["46","Huế",4],["48","Đà Nẵng",12],["51","Quảng Ngãi",11],["52","Gia Lai",14],["56","Khánh Hòa",8],["66","Đắk Lắk",15],["68","Lâm Đồng",17],["75","Đồng Nai",14],["79","Hồ Chí Minh",19],["80","Tây Ninh",12],["82","Đồng Tháp",12],["86","Vĩnh Long",14],["91","An Giang",15],["92","Cần Thơ",14],["96","Cà Mau",9]];
  var TP = { "Hà Nội":1, "Hải Phòng":1, "Huế":1, "Đà Nẵng":1, "Hồ Chí Minh":1, "Cần Thơ":1 };
  function tenTinh(t) {
    if (t === "Hồ Chí Minh") return T("dv.hcm");
    return T(TP[t] ? "dv.tp" : "dv.tinhPref", { t: t });
  }
  var CAP = [["toi-cao","dv.cap.toi-cao"],["cap-cao","dv.cap.cap-cao"],["tinh","dv.cap.tinh"],["khu-vuc","dv.cap.khu-vuc"]];
  var CHUC = [
    ["Viện trưởng","dv.chuc.vt"],
    ["Phó Viện trưởng","dv.chuc.pvt"],
    ["Kiểm sát viên cao cấp","dv.chuc.ksvcc"],
    ["Kiểm sát viên trung cấp","dv.chuc.ksvtc"],
    ["Kiểm sát viên sơ cấp","dv.chuc.ksvsc"],
    ["Kiểm tra viên","dv.chuc.ktv"],
    ["Chuyên viên","dv.chuc.cv"]
  ];
  var BO_QUA = "knks-don-vi-bo-qua";
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function css() {
    if (document.getElementById("dv-css")) return;
    var s = document.createElement("style"); s.id = "dv-css";
    s.textContent = "#dv-modal{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;background:rgba(6,22,48,.6);display:flex;align-items:center;justify-content:center;padding:14px;font-family:'Be Vietnam Pro',Arial,sans-serif}" +
      "#dv-modal .dv-box{background:#fff;color:#0f172a;width:100%;max-width:460px;max-height:92vh;overflow:auto;border-radius:18px;padding:20px 18px;box-shadow:0 20px 60px rgba(0,0,0,.35)}" +
      "html[data-theme=dark] #dv-modal .dv-box{background:#132230;color:#e2e8f0}" +
      "#dv-modal h2{margin:0 0 4px;font-size:19px;color:#1e5a8a}html[data-theme=dark] #dv-modal h2{color:#7cc4ff}" +
      "#dv-modal p.dv-m{margin:0 0 12px;font-size:13px;opacity:.8;line-height:1.5}" +
      "#dv-modal label{display:block;font-size:13px;font-weight:600;margin:10px 0 4px}" +
      "#dv-modal select,#dv-modal input{width:100%;box-sizing:border-box;min-height:44px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:10px;font:inherit;font-size:15px;background:inherit;color:inherit}" +
      "#dv-modal .dv-prev{margin-top:12px;padding:10px;border-radius:10px;background:rgba(13,148,136,.1);font-size:13px}" +
      "#dv-modal .dv-row{display:flex;gap:8px;margin-top:16px}#dv-modal .dv-row button{flex:1;min-height:46px;border-radius:12px;font:inherit;font-weight:700;font-size:15px;cursor:pointer;border:1px solid #cbd5e1;background:transparent;color:inherit}" +
      "#dv-modal .dv-row .dv-ok{background:#1e5a8a;border-color:#1e5a8a;color:#fff}" +
      "#dv-modal .dv-lang{display:flex;gap:8px;margin:0 0 14px}" +
      "#dv-modal .dv-lang button{flex:1;min-height:44px;border-radius:12px;border:1px solid #cbd5e1;background:transparent;font:inherit;font-weight:800;cursor:pointer;color:inherit}" +
      "#dv-modal .dv-lang button[aria-pressed=true]{background:#1e5a8a;border-color:#1e5a8a;color:#fff}";
    document.head.appendChild(s);
  }
  function opts(list, val) { return list.map(function (x) { return '<option value="' + esc(x[0]) + '"' + (x[0] === val ? " selected" : "") + ">" + esc(x[1]) + "</option>"; }).join(""); }

  var openState = { first: false, cur: null };

  function open(first, keep) {
    css();
    var existing = document.getElementById("dv-modal");
    if (existing) existing.remove();
    var cur = (keep && keep.cap) ? keep : (D.get() || { cap: "khu-vuc", tinh: "Cần Thơ" });
    openState.first = !!first; openState.cur = cur;
    var L = lang();
    var m = document.createElement("div"); m.id = "dv-modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "dv-h");
    m.innerHTML = '<div class="dv-box">' +
      '<div class="dv-lang" role="group" aria-label="' + esc(T("dv.lang")) + '">' +
        '<button type="button" data-knks-lang="vi" aria-pressed="' + (L === "vi" ? "true" : "false") + '">Tiếng Việt</button>' +
        '<button type="button" data-knks-lang="en" aria-pressed="' + (L === "en" ? "true" : "false") + '">English</button>' +
      "</div>" +
      '<h2 id="dv-h">' + esc(T("dv.title")) + "</h2>" +
      '<p class="dv-m">' + esc(first ? T("dv.welcome") : T("dv.lead")) + "</p>" +
      '<label for="dv-cap">' + esc(T("dv.cap")) + '</label><select id="dv-cap">' + opts(CAP.map(function (x) { return [x[0], T(x[1])]; }), cur.cap) + "</select>" +
      '<div id="dv-w-cc"><label for="dv-cc">' + esc(T("dv.cc")) + '</label><select id="dv-cc">' + opts([["Hà Nội", tenTinh("Hà Nội")],["Đà Nẵng", tenTinh("Đà Nẵng")],["Hồ Chí Minh", T("dv.hcm")]], cur.capCao) + "</select></div>" +
      '<div id="dv-w-t"><label for="dv-t">' + esc(T("dv.tinh")) + '</label><select id="dv-t">' + opts(TINH.map(function (x) { return [x[1], tenTinh(x[1])]; }), cur.tinh || "Cần Thơ") + "</select></div>" +
      '<div id="dv-w-kv"><label for="dv-kv">' + esc(T("dv.kv")) + '</label><select id="dv-kv"></select></div>' +
      '<label for="dv-ten">' + esc(T("dv.hoten")) + '</label><input id="dv-ten" autocomplete="name" value="' + esc(cur.hoTen || "") + '" />' +
      '<label for="dv-cd">' + esc(T("dv.chuc")) + '</label><input id="dv-cd" list="dv-cdl" value="' + esc(cur.chucDanh || "") + '" /><datalist id="dv-cdl">' + CHUC.map(function (c) { return "<option value=\"" + esc(c[0]) + "\">" + esc(T(c[1])) + "</option>"; }).join("") + "</datalist>" +
      '<div class="dv-prev" id="dv-prev"></div>' +
      '<div class="dv-row"><button type="button" id="dv-skip">' + esc(first ? T("dv.skip") : T("dv.close")) + '</button><button type="button" class="dv-ok" id="dv-save">' + esc(T("dv.save")) + "</button></div>" +
      (D.get() ? '<p class="dv-m" style="margin:10px 0 0;text-align:center"><a href="#" id="dv-del" style="color:inherit">' + esc(T("dv.delete")) + "</a></p>" : "") + "</div>";
    document.body.appendChild(m);
    function $(id) { return document.getElementById(id); }
    function fillKv() {
      var t = TINH.filter(function (x) { return x[1] === $("dv-t").value; })[0], n = t ? t[2] : 0, o = [];
      var ten = $("dv-t").value === "Hồ Chí Minh" ? T("dv.hcm") : $("dv-t").value;
      for (var i = 1; i <= n; i++) o.push([String(i), T("dv.kvItem", { n: i, tinh: ten })]);
      $("dv-kv").innerHTML = opts(o, String(cur.khuVuc || "1"));
    }
    function val() {
      var c = $("dv-cap").value, o = { cap: c, hoTen: $("dv-ten").value.trim(), chucDanh: $("dv-cd").value.trim() };
      if (c === "cap-cao") o.capCao = $("dv-cc").value;
      if (c === "tinh" || c === "khu-vuc") o.tinh = $("dv-t").value;
      if (c === "khu-vuc") o.khuVuc = $("dv-kv").value;
      return o;
    }
    function sync() {
      var c = $("dv-cap").value;
      $("dv-w-cc").hidden = c !== "cap-cao"; $("dv-w-t").hidden = !(c === "tinh" || c === "khu-vuc"); $("dv-w-kv").hidden = c !== "khu-vuc";
      var i = D.info(val());
      $("dv-prev").innerHTML = T("dv.preview", { ngan: esc(i.ngan) }).replace(esc(i.ngan), "<strong>" + esc(i.ngan) + "</strong>") +
        "<br>" + esc(T("dv.previewDoc", { td: i.tieuDe.join(" "), dia: i.diaDanh }));
    }
    fillKv(); sync();
    $("dv-cap").onchange = sync; $("dv-cc").onchange = sync; $("dv-kv").onchange = sync;
    $("dv-t").onchange = function () { cur.khuVuc = "1"; fillKv(); sync(); };
    $("dv-save").onclick = function () { D.set(val()); try { localStorage.removeItem(BO_QUA); } catch (e) {} m.remove(); location.reload(); };
    $("dv-skip").onclick = function () { if (first) try { localStorage.setItem(BO_QUA, "1"); } catch (e) {} m.remove(); };
    if ($("dv-del")) $("dv-del").onclick = function (e) { e.preventDefault(); D.set(null); m.remove(); location.reload(); };
    /* Đổi ngôn ngữ trong modal: giữ form, dựng lại */
    var langBtns = m.querySelectorAll(".dv-lang [data-knks-lang]");
    for (var bi = 0; bi < langBtns.length; bi++) {
      langBtns[bi].addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        var next = this.getAttribute("data-knks-lang");
        var now = val();
        if (g.KNKS_I18N && g.KNKS_I18N.set) g.KNKS_I18N.set(next);
        /* open() được gọi lại từ KNKS_I18N.onChange */
      });
    }
    setTimeout(function () { $("dv-cap").focus(); }, 50);
  }
  g.KNKS_DONVI_UI = { open: open, TINH: TINH };
  if (g.KNKS_I18N && g.KNKS_I18N.onChange) {
    g.KNKS_I18N.onChange(function () {
      if (document.getElementById("dv-modal")) {
        var keep = openState.cur;
        try {
          var cap = document.getElementById("dv-cap");
          if (cap) {
            keep = {
              cap: cap.value,
              capCao: (document.getElementById("dv-cc") || {}).value,
              tinh: (document.getElementById("dv-t") || {}).value,
              khuVuc: (document.getElementById("dv-kv") || {}).value,
              hoTen: (document.getElementById("dv-ten") || {}).value,
              chucDanh: (document.getElementById("dv-cd") || {}).value
            };
          }
        } catch (e) {}
        open(openState.first, keep);
      }
    });
  }
  function boot() {
    var b = document.querySelectorAll("[data-mo-don-vi]");
    for (var i = 0; i < b.length; i++) b[i].addEventListener("click", function (e) { e.preventDefault(); open(false); });
    var skip = false; try { skip = localStorage.getItem(BO_QUA) === "1"; } catch (e) {}
    if (!D.get() && !skip && !/[?&]khongchao\b/.test(location.search)) open(true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})(window);
