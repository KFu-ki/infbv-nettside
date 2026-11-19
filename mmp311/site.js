
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
    element.title = label;
  });

  const dialog = document.createElement("dialog");
  dialog.className = "cite-dialog";
  dialog.innerHTML = `
    <div>
      <h2>Cite this</h2>
      <p class="dialog-intro">Copy the reference for this learning resource.</p><p class="cite-clue"><strong>Tip:</strong> Cite original research for scholarly claims. Cite this resource for its model or teaching explanation. AI output is not an academic source. <a href="https://www.sokogskriv.no/en/kunstig-intelligens">Search &amp; Write guidance on AI</a>.</p>
      <label for="cite-output">Suggested reference</label>
      <textarea id="cite-output" class="cite-output" readonly></textarea>
      <div class="cite-actions">
        <button type="button" id="copy-cite" class="cite-button"
          title="Copy the suggested reference">Copy reference</button>
        <button type="button" id="close-cite" class="cite-button"
          title="Close citation dialog">Close</button>
      </div>
    </div>
  `;
  document.body.append(dialog);

  const output = dialog.querySelector("#cite-output");
  const copyButton = dialog.querySelector("#copy-cite");

  dialog.querySelector("#close-cite").onclick = () => dialog.close();

  copyButton.onclick = async () => {
    await navigator.clipboard.writeText(output.value);
    copyButton.textContent = "Copied";
  };

  const pageTitle =
    document.querySelector("h1")?.textContent.trim() || document.title;

  const year = new Date().getFullYear();

  const pageReference =
    `Fuglseth, K. (${year}). ${pageTitle} [Learning resource]. ` +
    `INFBV, Volda University College. ${location.href}`;

  function addCitation(node, label, reference) {
    if (!node || node.querySelector(":scope > .citation-tools")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "citation-tools";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "cite-button";
    button.textContent = "Cite this";
    button.title = `Cite ${label}`;

    button.onclick = () => {
      output.value = reference;
      copyButton.textContent = "Copy reference";
      dialog.showModal();
    };

    wrapper.append(button);
    node.append(wrapper);
  }

  addCitation(document.querySelector("main"), "this page", pageReference);

  document.querySelectorAll("figure, table").forEach((node, index) => {
    const caption = node.querySelector("figcaption, caption");
    const type = node.tagName === "TABLE" ? "Table" : "Figure";
    const label = caption?.textContent.trim() || `${type} ${index + 1}`;

    addCitation(
      node,
      label,
      `Fuglseth, K. (${year}). ${label} [${type}]. ` +
      `In ${pageTitle}. INFBV, Volda University College. ${location.href}`
    );
  });

  document.querySelectorAll("section").forEach(section => {
    const heading = section.querySelector(":scope > h2");
    if (!heading) return;

    addCitation(
      section,
      heading.textContent.trim(),
      `Fuglseth, K. (${year}). ${heading.textContent.trim()} [Section]. ` +
      `In ${pageTitle}. INFBV, Volda University College. ${location.href}`
    );
  });

  if (/\/(prk|soft|fiver)\//.test(location.pathname)) {
    const fullText = document.querySelector("#full-text");

    addCitation(
      fullText,
      "the original teaching text",
      `Fuglseth, K. (${year}). ${pageTitle} [Original teaching text]. ` +
      `INFBV, Volda University College. ${location.href}#full-text`
    );
  }
})();
