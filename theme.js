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

  global.KNKS_THEME = { KEY: KEY, resolve: resolve, apply: apply, set: set };
})(window);
