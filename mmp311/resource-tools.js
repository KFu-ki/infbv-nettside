/* MMP311 resource dialogs */
(() => {
  const triggers = document.querySelectorAll("[data-resource-dialog]");
  const dialogs = document.querySelectorAll(".resource-dialog");
  let opener = null;

  const pageTitle =
    document.querySelector("h1")?.textContent.trim() ||
    document.title.replace(/\s*[|–-].*$/, "").trim();

  const canonicalUrl =
    document.querySelector('link[rel="canonical"]')?.href ||
    window.location.href.split("#")[0].split("?")[0];

  const year = 2027;
  const reference =
    `Fuglseth, K. (${year}). ${pageTitle} [Learning resource]. ` +
    `MMP311, Volda University College. ${canonicalUrl}`;

  const citationOutput =
    document.querySelector("#resource-citation-output");
  const copyButton =
    document.querySelector(".resource-copy-citation");

  if (citationOutput) {
    citationOutput.value = reference;
  }

  if (copyButton && citationOutput) {
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(citationOutput.value);
      copyButton.textContent = "Copied";
    });
  }

  const closeDialog = dialog => {
    if (dialog?.open) dialog.close();
  };

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const name = trigger.dataset.resourceDialog;
      const dialog = document.querySelector(
        `.resource-dialog[data-dialog-name="${name}"]`
      );

      if (!dialog) return;

      opener = trigger;

      if (name === "citation" && citationOutput) {
        citationOutput.value = reference;
        if (copyButton) copyButton.textContent = "Copy reference";
      }

      dialog.showModal();
      dialog.querySelector(".resource-dialog__close")?.focus();
    });
  });

  dialogs.forEach(dialog => {
    dialog.querySelector(".resource-dialog__close")
      ?.addEventListener("click", () => closeDialog(dialog));

    dialog.addEventListener("click", event => {
      if (event.target === dialog) closeDialog(dialog);
    });

    dialog.addEventListener("close", () => {
      opener?.focus();
      opener = null;
    });
  });
})();
