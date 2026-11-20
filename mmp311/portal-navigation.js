(() => {
  "use strict";

  const media = window.matchMedia("(max-width: 50rem)");

  document.addEventListener("DOMContentLoaded", () => {
    const shell = document.querySelector(".portal-shell");
    const inner = shell?.querySelector(".portal-shell__inner");
    const portalNav = shell?.querySelector(".portal-nav");
    const courseNav = shell?.querySelector(".course-nav");

    if (!shell || !inner || !portalNav || !courseNav) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "portal-menu-button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "portal-mobile-menu");
    button.innerHTML = `
      <span class="portal-menu-button__icon" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span>Menu</span>
    `;

    const panel = document.createElement("div");
    panel.id = "portal-mobile-menu";
    panel.className = "portal-menu-panel";
    panel.hidden = true;
    panel.innerHTML = `
      <div class="portal-menu-panel__header">
        <strong>INFBV Knowledge Atlas</strong>
        <button type="button"
          class="portal-menu-panel__close"
          aria-label="Close menu">×</button>
      </div>
      <div class="portal-menu-panel__body"></div>
    `;

    const body = panel.querySelector(".portal-menu-panel__body");
    const close = panel.querySelector(".portal-menu-panel__close");

    inner.prepend(button);
    inner.append(panel);

    const moveNavigation = () => {
      if (media.matches) {
        if (!body.contains(portalNav)) {
          body.append(portalNav, courseNav);
        }
      } else if (!inner.contains(portalNav)) {
        inner.insertBefore(portalNav, panel);
        inner.insertBefore(courseNav, panel);
      }
    };

    const focusable = () => [
      ...panel.querySelectorAll(
        'a[href], button:not([disabled])'
      )
    ];

    const openMenu = () => {
      moveNavigation();
      panel.hidden = false;
      button.setAttribute("aria-expanded", "true");
      document.body.classList.add("portal-menu-open");
      requestAnimationFrame(() => close.focus());
    };

    const closeMenu = (restoreFocus = true) => {
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");
      document.body.classList.remove("portal-menu-open");

      if (restoreFocus) button.focus();
    };

    button.addEventListener("click", () => {
      panel.hidden ? openMenu() : closeMenu();
    });

    close.addEventListener("click", () => closeMenu());

    panel.addEventListener("click", event => {
      if (event.target.closest("a")) closeMenu(false);
    });

    panel.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    });

    const handleWidth = () => {
      if (!media.matches && !panel.hidden) {
        closeMenu(false);
      }
      moveNavigation();
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleWidth);
    } else {
      media.addListener(handleWidth);
    }

    handleWidth();
  });
})();
