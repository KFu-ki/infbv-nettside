(() => {
  const root = document.documentElement;
  const savedSize = localStorage.getItem("mmp-size");

  if (savedSize) {
    root.style.setProperty("--size", `${savedSize}px`);
  }

  document.querySelectorAll("[data-size]").forEach(button => {
    button.addEventListener("click", () => {
      root.style.setProperty("--size", `${button.dataset.size}px`);
      localStorage.setItem("mmp-size", button.dataset.size);
    });
  });

  document.querySelectorAll("a, button").forEach(element => {
    if (element.title) return;
    const label =
      element.getAttribute("aria-label") ||
      element.textContent.trim().replace(/\s+/g, " ");
    if (label) element.title = label;
  });
})();
