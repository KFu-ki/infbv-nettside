(() => {
  const html = document.documentElement;
  html.dataset.theme = "light";
  localStorage.removeItem("mmp311-theme");

  const header = document.querySelector(".site-header");

  if (header && !document.querySelector(".font-tools")) {
    const tools = document.createElement("div");
    tools.className = "font-tools";
    tools.setAttribute("aria-label", "Text size");
    tools.innerHTML = `
      <span class="sr-only">Text size</span>
      <button type="button" data-size="16" title="Reduce text size">A−</button>
      <button type="button" data-size="18" title="Use standard text size">A</button>
      <button type="button" data-size="21" title="Increase text size">A+</button>
    `;
    header.append(tools);

    tools.addEventListener("click", event => {
      const size = event.target.dataset.size;
      if (!size) return;
      html.style.setProperty("--reading-size", `${size}px`);
      localStorage.setItem("mmp311-size", size);
    });
  }

  const savedSize = localStorage.getItem("mmp311-size");
  if (savedSize) {
    html.style.setProperty("--reading-size", `${savedSize}px`);
  }

  document.querySelectorAll("a, button").forEach(element => {
    if (element.title) return;
    const label =
      element.getAttribute("aria-label") ||
      element.textContent.trim().replace(/\s+/g, " ");
    if (label) element.title = label;
  });
})();
