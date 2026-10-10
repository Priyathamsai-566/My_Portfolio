"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navigation.classList.toggle("open", open);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }
  });
}

const projectGrid = document.querySelector("#project-grid");
if (projectGrid) {
  const cards = [...projectGrid.querySelectorAll(".project-card")];
  const filters = [...document.querySelectorAll(".filter-button")];
  const search = document.querySelector("#project-search");
  const clear = document.querySelector("#clear-search");
  const empty = document.querySelector("#empty-state");
  const count = document.querySelector("#project-count");
  let category = "all";

  function updateProjects() {
    const query = (search?.value || "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const categoryMatch = category === "all" || card.dataset.category === category;
      const searchMatch = !query || (card.dataset.search + " " + card.textContent).toLowerCase().includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = `${visible} project${visible === 1 ? "" : "s"} shown`;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      filters.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      updateProjects();
    });
  });

  search?.addEventListener("input", updateProjects);
  clear?.addEventListener("click", () => {
    if (search) {
      search.value = "";
      search.focus();
      updateProjects();
    }
  });
  updateProjects();

  const dialog = document.querySelector("#project-dialog");
  const previousFocus = { element: null };

  document.querySelectorAll(".detail-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (!dialog) return;
      previousFocus.element = button;
      document.querySelector("#dialog-title").textContent = button.dataset.title;
      document.querySelector("#dialog-description").textContent = button.dataset.description;
      document.querySelector("#dialog-role").textContent = button.dataset.role;
      document.querySelector("#dialog-status").textContent = button.dataset.status;
      dialog.showModal();
      dialog.querySelector(".dialog-close")?.focus();
    });
  });

  dialog?.addEventListener("close", () => previousFocus.element?.focus());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

document.querySelector("#print-resume")?.addEventListener("click", () => window.print());

const copyButton = document.querySelector("#copy-email");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = document.querySelector("#email-text")?.textContent.trim();
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(email);
      if (status) status.textContent = "Copied.";
    } catch {
      if (status) status.textContent = `Copy this address: ${email}`;
    }
  });
}

const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const error = document.querySelector("#form-error");
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();

    form.querySelectorAll("input, textarea").forEach((field) => field.removeAttribute("aria-invalid"));

    const invalid = [];
    if (!name) invalid.push([form.elements.name, "Please enter your name."]);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid.push([form.elements.email, "Please enter a valid email address."]);
    if (!subject) invalid.push([form.elements.subject, "Please enter a subject."]);
    if (message.length < 10) invalid.push([form.elements.message, "Please enter a message of at least 10 characters."]);

    if (invalid.length) {
      invalid.forEach(([field]) => field.setAttribute("aria-invalid", "true"));
      if (error) error.textContent = invalid[0][1];
      invalid[0][0].focus();
      return;
    }

    if (error) error.textContent = "";
    const destination = document.querySelector("#email-text")?.textContent.trim() || "priyathamsaiuddandi@gmail.com";
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${encodeURIComponent(destination)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}