/* MMP311 resource dialogs: start */
(() => {
  const triggers = document.querySelectorAll("[data-resource-dialog]");
  const dialogs = document.querySelectorAll(".resource-dialog");
  let opener = null;

  const closeDialog = (dialog) => {
    if (dialog && dialog.open) {
      dialog.close();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const name = trigger.dataset.resourceDialog;
      const dialog = document.querySelector(
        `.resource-dialog[data-dialog-name="${name}"]`
      );

      if (!dialog) return;

      opener = trigger;
      dialog.showModal();

      const closeButton = dialog.querySelector(".resource-dialog__close");
      if (closeButton) closeButton.focus();
    });
  });

  dialogs.forEach((dialog) => {
    const closeButton = dialog.querySelector(".resource-dialog__close");

    if (closeButton) {
      closeButton.addEventListener("click", () => closeDialog(dialog));
    }

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });

    dialog.addEventListener("close", () => {
      if (opener) {
        opener.focus();
        opener = null;
      }
    });
  });
})();
/* MMP311 resource dialogs: end */
