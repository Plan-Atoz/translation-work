document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".markdown-body sup[id^='fnref'] a.footnote").forEach((link) => {
    const targetId = decodeURIComponent(link.getAttribute("href").slice(1));
    const target = document.getElementById(targetId);
    if (!target) return;

    const note = target.cloneNode(true);
    note.querySelectorAll("a[href^='#fnref']").forEach((backlink) => backlink.remove());
    const content = note.textContent.replace(/\s+/g, " ").trim();

    const preview = document.createElement("span");
    preview.className = "footnote-preview";
    preview.textContent = `[${link.textContent.trim()}] (${content})`;
    link.parentElement.appendChild(preview);
    link.parentElement.classList.add("has-footnote-preview");

    const show = () => preview.classList.add("is-visible");
    const hide = () => preview.classList.remove("is-visible");
    link.addEventListener("mouseenter", show);
    link.addEventListener("mouseleave", hide);
    link.addEventListener("focus", show);
    link.addEventListener("blur", hide);
  });
});
