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

  /* Chân trang bản quyền dùng chung (trang chủ có chân trang riêng: #knks-ban-quyen). */
  var BAN_QUYEN = { ten: "THIÊN PHÚC – VIỆN KIỂM SÁT NHÂN DÂN THÀNH PHỐ CẦN THƠ", sdt: "0939103666", nam: 2026 };
  function chanTrang() {
    if (!document.body || document.getElementById("knks-ban-quyen") || document.documentElement.hasAttribute("data-no-ban-quyen")) return;
    var f = document.createElement("footer");
    f.id = "knks-ban-quyen";
    f.setAttribute("style", "text-align:center;font:12px/1.6 'Be Vietnam Pro',Arial,sans-serif;color:inherit;opacity:.75;padding:14px 12px 22px;margin-top:8px;clear:both");
    f.innerHTML = "T\u00e1c gi\u1ea3: <strong>" + BAN_QUYEN.ten + "</strong> \u00a9 " + BAN_QUYEN.nam + " \u00b7 Li\u00ean h\u1ec7: <a href=\"tel:" + BAN_QUYEN.sdt + "\" style=\"color:inherit;font-weight:700\">" + BAN_QUYEN.sdt + "</a>";
    document.body.appendChild(f);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", chanTrang); else chanTrang();

  global.KNKS_THEME = { BAN_QUYEN: BAN_QUYEN, KEY: KEY, resolve: resolve, apply: apply, set: set };
})(window);
