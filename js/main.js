// Injecte les valeurs de SITE_CONFIG dans le HTML
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (SITE_CONFIG[key] !== undefined) {
      if (el.tagName === "A") {
        if (key === "telephone") el.href = `tel:${SITE_CONFIG[key].replace(/\s/g, "")}`;
        if (key === "email") el.href = `mailto:${SITE_CONFIG[key]}`;
      }
      if (!el.hasAttribute("data-config-static-text")) {
        el.textContent = SITE_CONFIG[key];
      }
    }
  });
});
