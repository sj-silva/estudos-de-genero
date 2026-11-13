(function () {
  try {
    var t =
      localStorage.getItem("tema") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-bs-theme", t);
  } catch (e) {}
})();
