(function (global) {
  var KEY = "knks-theme";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function resolve() {
    var s = stored();
    if (s === "dark" || s === "light") return s;
    try {
      if (global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    } catch (e) {}
    return "light";
  }

  function apply(theme) {
    if (theme !== "dark" && theme !== "light") return;
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-bs-theme", theme);
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b141c" : "#1e5a8a");
    var btns = document.querySelectorAll("[data-theme-set]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-theme-set") === theme ? "true" : "false");
    }
  }

  function set(theme) {
    if (theme !== "dark" && theme !== "light") return;
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    apply(theme);
    try { global.dispatchEvent(new CustomEvent("knks-theme", { detail: theme })); } catch (e) {}
  }

  apply(resolve());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { apply(resolve()); });
  }

  global.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(resolve());
  });
  global.addEventListener("message", function (e) {
    var d = e && e.data;
    if (!d) return;
    if (d.knksTheme === "dark" || d.knksTheme === "light") apply(d.knksTheme);
  });
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var b = t.closest("[data-theme-set]");
    if (!b) return;
    e.preventDefault();
    set(b.getAttribute("data-theme-set"));
  });
  try {
    var mq = global.matchMedia("(prefers-color-scheme: dark)");
    var onMq = function () { if (!stored()) apply(resolve()); };
    if (mq.addEventListener) mq.addEventListener("change", onMq);
    else if (mq.addListener) mq.addListener(onMq);
  } catch (e) {}

  /* Chân trang bản quyền: hiện chỉ dùng ở trang chủ (#knks-ban-quyen trong index.html); hàm chanTrang không còn được gọi. */
  var BAN_QUYEN = { ten: "Thiên Phúc", sdt: "0939103666", nam: 2026 };
  function chanTrang() {
    if (!document.body || document.getElementById("knks-ban-quyen") || document.documentElement.hasAttribute("data-no-ban-quyen")) return;
    var f = document.createElement("footer");
    f.id = "knks-ban-quyen";
    f.setAttribute("style", "text-align:center;font:12px/1.6 'Be Vietnam Pro',Arial,sans-serif;color:inherit;opacity:.75;padding:14px 12px 22px;margin-top:8px;clear:both");
    var goc = (document.querySelector('script[src$="theme.js"]') || {}).src || location.href;
    var lk = [];
    if (!(/\/cai-dat\.html$/.test(location.pathname) || (global.matchMedia && global.matchMedia("(display-mode: standalone)").matches))) lk.push("<a href=\"" + new URL("cai-dat.html", goc).href + "\" style=\"color:inherit\">T\u1ea3i \u1ee9ng d\u1ee5ng</a>");
    if (!/\/privacy\.html$/.test(location.pathname)) lk.push("<a href=\"" + new URL("privacy.html", goc).href + "\" style=\"color:inherit\">Quy\u1ec1n ri\u00eang t\u01b0</a>");
    f.innerHTML = (lk.length ? "<div style=\"font-size:10.5px;opacity:.7;margin-bottom:4px\">" + lk.join(" \u00b7 ") + "</div>" : "") +
      "<div class=\"knks-bq\">" + BAN_QUYEN.ten + " \u00a9 " + BAN_QUYEN.nam + "</div>";
    document.body.appendChild(f);
  }
  // Theo yêu cầu: không hiện chân trang tác giả ở trang con (chỉ trang chủ index.html có dòng «Thiên Phúc © 2026»).

  /* Đơn vị công tác do người dùng chọn (chỉ lưu localStorage "knks-don-vi", không gửi đi đâu).
     Mặc định khi chưa chọn: VKSND thành phố Cần Thơ (giữ nguyên cách hiển thị cũ). */
  var DV_KEY = "knks-don-vi";
  var TP6 = { "Hà Nội": 1, "Hải Phòng": 1, "Huế": 1, "Đà Nẵng": 1, "Hồ Chí Minh": 1, "Cần Thơ": 1 };
  function dvGet() { try { var o = JSON.parse(localStorage.getItem(DV_KEY) || "null"); return o && o.cap ? o : null; } catch (e) { return null; } }
  function dvSet(o) { try { if (o) localStorage.setItem(DV_KEY, JSON.stringify(o)); else localStorage.removeItem(DV_KEY); } catch (e) {} dvApply(document.body); }
  function tinhDay(t) { return t === "Hồ Chí Minh" ? "Thành phố Hồ Chí Minh" : (TP6[t] ? "thành phố " : "tỉnh ") + t; }
  function tinhNgan(t) { return t === "Hồ Chí Minh" ? "TP. Hồ Chí Minh" : (TP6[t] ? "TP " : "tỉnh ") + t; }
  // Tên đầy đủ (chữ thường), tên ngắn, 2 dòng tiêu đề văn bản (in hoa) và địa danh ghi ngày tháng.
  function dvInfo(o) {
    o = o || dvGet() || { cap: "tinh", tinh: "Cần Thơ" };
    var ten, ngan, dong2, dia;
    if (o.cap === "toi-cao") { ten = "Viện kiểm sát nhân dân tối cao"; ngan = "VKSND tối cao"; dong2 = "TỐI CAO"; dia = "Hà Nội"; }
    else if (o.cap === "cap-cao") { var n = o.capCao || "Hà Nội"; ten = "Viện kiểm sát nhân dân cấp cao tại " + (n === "Hồ Chí Minh" ? "Thành phố Hồ Chí Minh" : n); ngan = "VKSND cấp cao tại " + (n === "Hồ Chí Minh" ? "TP. Hồ Chí Minh" : n); dong2 = "CẤP CAO TẠI " + (n === "Hồ Chí Minh" ? "THÀNH PHỐ HỒ CHÍ MINH" : n.toUpperCase()); dia = n === "Hồ Chí Minh" ? "TP. Hồ Chí Minh" : n; }
    else if (o.cap === "khu-vuc") { var kv = o.khuVuc || "…", hcm = o.tinh === "Hồ Chí Minh", tk = hcm ? "Thành phố Hồ Chí Minh" : (o.tinh || "…"); ten = "Viện kiểm sát nhân dân khu vực " + kv + " - " + tk; ngan = "VKSND khu vực " + kv + " - " + (hcm ? "TP. Hồ Chí Minh" : tk); dong2 = ("KHU VỰC " + kv + " - " + tk).toUpperCase(); dia = o.tinh === "Hồ Chí Minh" ? "TP. Hồ Chí Minh" : (o.tinh || "…"); }
    else { var tt = o.tinh || "Cần Thơ"; ten = "Viện kiểm sát nhân dân " + tinhDay(tt); ngan = "VKSND " + tinhNgan(tt); dong2 = tinhDay(tt).toUpperCase(); dia = tt === "Hồ Chí Minh" ? "TP. Hồ Chí Minh" : tt; }
    return { cap: o.cap, ten: ten, ngan: ngan, tieuDe: ["VIỆN KIỂM SÁT NHÂN DÂN", dong2], diaDanh: dia, hoTen: o.hoTen || "", chucDanh: o.chucDanh || "", daChon: !!dvGet() };
  }
  // Thay «VKSND TP Cần Thơ» sau «Dành cho KSV» bằng đơn vị đã chọn (chỉ khi người dùng đã chọn).
  var DV_RE = /(Dành cho KSV\s*·?\s*)VKSND TP Cần Thơ/;
  function dvApply(root) {
    var o = dvGet(); if (!o || !root) return;
    var ngan = dvInfo(o).ngan, w = document.createTreeWalker(root, 4), n, list = [];
    while ((n = w.nextNode())) if (DV_RE.test(n.nodeValue)) list.push(n);
    list.forEach(function (x) { x.nodeValue = x.nodeValue.replace(DV_RE, "$1" + ngan); });
    var h = document.querySelectorAll("[data-don-vi]");
    for (var i = 0; i < h.length; i++) h[i].textContent = dvInfo(o)[h[i].getAttribute("data-don-vi")] || h[i].textContent;
  }
  function dvStart() {
    dvApply(document.body);
    try { new MutationObserver(function (ms) { if (!dvGet()) return; ms.forEach(function (m) { for (var i = 0; i < m.addedNodes.length; i++) { var x = m.addedNodes[i]; if (x.nodeType === 1 && /Dành cho KSV/.test(x.textContent || "")) dvApply(x); } }); }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", dvStart); else dvStart();
  global.addEventListener("storage", function (e) { if (e.key === DV_KEY) dvApply(document.body); });
  global.KNKS_DONVI = { KEY: DV_KEY, get: dvGet, set: dvSet, info: dvInfo, apply: dvApply };


  /* Nạp knks-i18n.js (cùng thư mục với theme.js) nếu trang chưa gắn sẵn. */
  (function loadI18n() {
    if (global.KNKS_I18N) return;
    if (document.querySelector('script[src*="knks-i18n.js"]')) return;
    var ref = document.currentScript || document.querySelector('script[src*="theme.js"]');
    var base = (ref && ref.src) ? ref.src : (global.location && location.href) || "theme.js";
    var el = document.createElement("script");
    el.src = new URL("knks-i18n.js", base).href;
    el.async = false;
    (ref && ref.parentNode ? ref.parentNode.insertBefore(el, ref.nextSibling) : document.head.appendChild(el));
  })();

  global.KNKS_THEME = { BAN_QUYEN: BAN_QUYEN, KEY: KEY, resolve: resolve, apply: apply, set: set };
})(window);
