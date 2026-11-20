(() => {
  "use strict";

  const INDEX_URL = "/mmp311/search/search-index.json";
  const SEARCH_URL = "/mmp311/search/";
  let indexPromise;

  const normalise = value =>
    String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const loadIndex = () => {
    if (!indexPromise) {
      indexPromise = fetch(INDEX_URL, { cache: "no-cache" }).then(response => {
        if (!response.ok) throw new Error("Search index unavailable");
        return response.json();
      });
    }
    return indexPromise;
  };

  const scoreItem = (item, terms) => {
    const title = normalise(item.title);
    const headings = normalise(item.headings);
    const text = normalise(item.text);
    let score = 0;

    for (const term of terms) {
      if (title === term) score += 30;
      if (title.includes(term)) score += 14;
      if (headings.includes(term)) score += 7;
      score += Math.min((text.split(term).length - 1), 8);
    }

    return score;
  };

  const createSearch = () => {
    const container = document.createElement("div");
    container.className = "portal-search";
    container.innerHTML = `
      <button
        class="portal-search__open"
        type="button"
        aria-haspopup="dialog"
        aria-controls="portal-search-dialog"
      >
        <span aria-hidden="true">⌕</span>
        <span>Search</span>
      </button>

      <dialog
        class="portal-search__dialog"
        id="portal-search-dialog"
        aria-labelledby="portal-search-title"
      >
        <div class="portal-search__panel">
          <div class="portal-search__header">
            <div>
              <p class="portal-search__eyebrow">INFBV Knowledge Atlas</p>
              <h2 id="portal-search-title">Search MMP311</h2>
            </div>
            <button
              class="portal-search__close"
              type="button"
              aria-label="Close search"
            >×</button>
          </div>

          <form class="portal-search__form" role="search">
            <label for="portal-search-input">
              Search concepts, models, skills and learning resources
            </label>
            <div class="portal-search__row">
              <input
                id="portal-search-input"
                name="q"
                type="search"
                inputmode="search"
                enterkeyhint="search"
                autocomplete="off"
                placeholder="For example: uncertainty, FIVER or academic writing"
              >
              <button type="submit">Search</button>
            </div>
          </form>

          <p
            class="portal-search__status"
            role="status"
            aria-live="polite"
          ></p>

          <ol class="portal-search__results"></ol>

          <p class="portal-search__fallback">
            <a href="${SEARCH_URL}">Open the full guided search</a>
          </p>
        </div>
      </dialog>
    `;

    document.body.append(container);

    return {
      openButton: container.querySelector(".portal-search__open"),
      dialog: container.querySelector(".portal-search__dialog"),
      closeButton: container.querySelector(".portal-search__close"),
      form: container.querySelector(".portal-search__form"),
      input: container.querySelector("#portal-search-input"),
      status: container.querySelector(".portal-search__status"),
      results: container.querySelector(".portal-search__results")
    };
  };

  const replaceSearchLinks = openSearch => {
    const links = [...document.querySelectorAll('a[href="/mmp311/search/"]')];

    links.forEach(link => {
      if (link.closest(".portal-search")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "portal-search__nav-button";
      button.textContent = link.textContent.trim() || "Search";
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "portal-search-dialog");
      button.addEventListener("click", openSearch);
      link.replaceWith(button);
    });
  };

  const renderResults = (elements, data, query) => {
    const terms = normalise(query).split(" ").filter(Boolean);

    if (!terms.length) {
      elements.status.textContent = "Enter one or more search terms.";
      elements.results.replaceChildren();
      return;
    }

    const hits = data
      .map(item => ({ ...item, score: scoreItem(item, terms) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    elements.results.replaceChildren(
      ...hits.map(hit => {
        const item = document.createElement("li");
        const heading = document.createElement("h3");
        const link = document.createElement("a");
        const summary = document.createElement("p");

        link.href = hit.url;
        link.textContent = hit.title;
        heading.append(link);

        const source = hit.headings || hit.text || "";
        summary.textContent =
          source.length > 240 ? `${source.slice(0, 237)}…` : source;

        item.append(heading, summary);
        return item;
      })
    );

    elements.status.textContent = hits.length
      ? `${hits.length} relevant result${hits.length === 1 ? "" : "s"}.`
      : `No results for “${query}”. Try another term.`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const elements = createSearch();
    let previousFocus = null;

    const openSearch = event => {
      if (event) event.preventDefault();
      previousFocus = document.activeElement;
      elements.dialog.showModal();
      requestAnimationFrame(() => elements.input.focus());
      loadIndex().catch(() => {
        elements.status.textContent =
          "Search is temporarily unavailable. Open the full guided search.";
      });
    };

    const closeSearch = () => elements.dialog.close();

    elements.openButton.addEventListener("click", openSearch);
    elements.closeButton.addEventListener("click", closeSearch);

    elements.dialog.addEventListener("click", event => {
      if (event.target === elements.dialog) closeSearch();
    });

    elements.dialog.addEventListener("close", () => {
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    });

    elements.form.addEventListener("submit", async event => {
      event.preventDefault();
      elements.status.textContent = "Searching…";

      try {
        const data = await loadIndex();
        renderResults(elements, data, elements.input.value);
      } catch {
        elements.status.textContent =
          "Search is temporarily unavailable. Open the full guided search.";
      }
    });

    replaceSearchLinks(openSearch);

    document.addEventListener("keydown", event => {
      const target = event.target;
      const writing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable;

      if (event.key === "/" && !writing && !elements.dialog.open) {
        event.preventDefault();
        openSearch();
      }
    });
  });
})();
