/* Màn hình «Đơn vị công tác»: hiện lần đầu mở app, sửa lại qua nút «Đơn vị công tác».
   Chỉ lưu trên máy (localStorage "knks-don-vi" qua KNKS_DONVI trong theme.js), không gửi đi đâu.
   Nguồn danh sách:
   - 34 đơn vị hành chính cấp tỉnh: Quyết định 19/2025/QĐ-TTg (Bảng danh mục và mã số các ĐVHC Việt Nam, từ 01/7/2025), Nghị quyết 202/2025/QH15.
   - Số VKSND khu vực từng tỉnh: Phụ lục Quyết định 115/QĐ-VKSTC ngày 30/6/2025 (thành lập theo Nghị quyết 84/2025/UBTVQH15); tên dạng «Viện kiểm sát nhân dân khu vực N - <Tỉnh>».
   - VKSND cấp cao: tại Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh. */
(function (g) {
  var D = g.KNKS_DONVI; if (!D) return;
  // [mã, tên ngắn, số VKSND khu vực]
  var TINH = [["01","Hà Nội",12],["04","Cao Bằng",5],["08","Tuyên Quang",8],["11","Điện Biên",5],["12","Lai Châu",4],["14","Sơn La",6],["15","Lào Cai",9],["19","Thái Nguyên",9],["20","Lạng Sơn",5],["22","Quảng Ninh",6],["24","Bắc Ninh",9],["25","Phú Thọ",17],["31","Hải Phòng",13],["33","Hưng Yên",8],["37","Ninh Bình",11],["38","Thanh Hóa",13],["40","Nghệ An",12],["42","Hà Tĩnh",5],["44","Quảng Trị",8],["46","Huế",4],["48","Đà Nẵng",12],["51","Quảng Ngãi",11],["52","Gia Lai",14],["56","Khánh Hòa",8],["66","Đắk Lắk",15],["68","Lâm Đồng",17],["75","Đồng Nai",14],["79","Hồ Chí Minh",19],["80","Tây Ninh",12],["82","Đồng Tháp",12],["86","Vĩnh Long",14],["91","An Giang",15],["92","Cần Thơ",14],["96","Cà Mau",9]];
  var TP = { "Hà Nội":1, "Hải Phòng":1, "Huế":1, "Đà Nẵng":1, "Hồ Chí Minh":1, "Cần Thơ":1 };
  function tenTinh(t) { return t === "Hồ Chí Minh" ? "Thành phố Hồ Chí Minh" : (TP[t] ? "Thành phố " : "Tỉnh ") + t; }
  var CAP = [["toi-cao","VKSND tối cao"],["cap-cao","VKSND cấp cao"],["tinh","VKSND tỉnh, thành phố"],["khu-vuc","VKSND khu vực"]];
  var CHUC = ["Viện trưởng","Phó Viện trưởng","Kiểm sát viên cao cấp","Kiểm sát viên trung cấp","Kiểm sát viên sơ cấp","Kiểm tra viên","Chuyên viên"];
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
      "#dv-modal .dv-row .dv-ok{background:#1e5a8a;border-color:#1e5a8a;color:#fff}";
    document.head.appendChild(s);
  }
  function opts(list, val) { return list.map(function (x) { return '<option value="' + esc(x[0]) + '"' + (x[0] === val ? " selected" : "") + ">" + esc(x[1]) + "</option>"; }).join(""); }

  function open(first) {
    css();
    var cur = D.get() || { cap: "khu-vuc", tinh: "Cần Thơ" };
    var m = document.createElement("div"); m.id = "dv-modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-labelledby", "dv-h");
    m.innerHTML = '<div class="dv-box"><h2 id="dv-h">Đơn vị công tác</h2>' +
      '<p class="dv-m">' + (first ? "Chào bạn! " : "") + 'Chọn nơi bạn công tác để ứng dụng điền sẵn tên cơ quan trong Quyết định phân công KSV và các mẫu văn bản. Thông tin <strong>chỉ lưu trên máy này</strong>, không gửi đi đâu; sửa lại bất cứ lúc nào bằng nút «Đơn vị công tác».</p>' +
      '<label for="dv-cap">Cấp</label><select id="dv-cap">' + opts(CAP, cur.cap) + "</select>" +
      '<div id="dv-w-cc"><label for="dv-cc">VKSND cấp cao tại</label><select id="dv-cc">' + opts([["Hà Nội","Hà Nội"],["Đà Nẵng","Đà Nẵng"],["Hồ Chí Minh","Thành phố Hồ Chí Minh"]], cur.capCao) + "</select></div>" +
      '<div id="dv-w-t"><label for="dv-t">Tỉnh, thành phố</label><select id="dv-t">' + opts(TINH.map(function (x) { return [x[1], tenTinh(x[1])]; }), cur.tinh || "Cần Thơ") + "</select></div>" +
      '<div id="dv-w-kv"><label for="dv-kv">Viện kiểm sát nhân dân khu vực</label><select id="dv-kv"></select></div>' +
      '<label for="dv-ten">Họ và tên (tuỳ chọn)</label><input id="dv-ten" autocomplete="name" value="' + esc(cur.hoTen || "") + '" />' +
      '<label for="dv-cd">Chức danh (tuỳ chọn)</label><input id="dv-cd" list="dv-cdl" value="' + esc(cur.chucDanh || "") + '" /><datalist id="dv-cdl">' + CHUC.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("") + "</datalist>" +
      '<div class="dv-prev" id="dv-prev"></div>' +
      '<div class="dv-row"><button type="button" id="dv-skip">' + (first ? "Bỏ qua" : "Đóng") + '</button><button type="button" class="dv-ok" id="dv-save">Lưu</button></div>' +
      (D.get() ? '<p class="dv-m" style="margin:10px 0 0;text-align:center"><a href="#" id="dv-del" style="color:inherit">Xoá thông tin đơn vị trên máy này</a></p>' : "") + "</div>";
    document.body.appendChild(m);
    function $(id) { return document.getElementById(id); }
    function fillKv() {
      var t = TINH.filter(function (x) { return x[1] === $("dv-t").value; })[0], n = t ? t[2] : 0, o = [];
      for (var i = 1; i <= n; i++) o.push([String(i), "Khu vực " + i + " - " + ($("dv-t").value === "Hồ Chí Minh" ? "Thành phố Hồ Chí Minh" : $("dv-t").value)]);
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
      $("dv-prev").innerHTML = "Hiển thị: <strong>Dành cho KSV · " + esc(i.ngan) + "</strong><br>Tiêu đề văn bản: " + esc(i.tieuDe.join(" ")) + " · " + esc(i.diaDanh) + ", ngày …";
    }
    fillKv(); sync();
    $("dv-cap").onchange = sync; $("dv-cc").onchange = sync; $("dv-kv").onchange = sync;
    $("dv-t").onchange = function () { cur.khuVuc = "1"; fillKv(); sync(); };
    $("dv-save").onclick = function () { D.set(val()); try { localStorage.removeItem(BO_QUA); } catch (e) {} m.remove(); location.reload(); };
    $("dv-skip").onclick = function () { if (first) try { localStorage.setItem(BO_QUA, "1"); } catch (e) {} m.remove(); };
    if ($("dv-del")) $("dv-del").onclick = function (e) { e.preventDefault(); D.set(null); m.remove(); location.reload(); };
    setTimeout(function () { $("dv-cap").focus(); }, 50);
  }
  g.KNKS_DONVI_UI = { open: open, TINH: TINH };
  function boot() {
    var b = document.querySelectorAll("[data-mo-don-vi]");
    for (var i = 0; i < b.length; i++) b[i].addEventListener("click", function (e) { e.preventDefault(); open(false); });
    var skip = false; try { skip = localStorage.getItem(BO_QUA) === "1"; } catch (e) {}
    if (!D.get() && !skip && !/[?&]khongchao\b/.test(location.search)) open(true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})(window);
