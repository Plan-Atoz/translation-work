document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".markdown-body sup[id^='fnref'] a.footnote").forEach((link) => {
    const targetId = decodeURIComponent(link.getAttribute("href").slice(1));
    const target = document.getElementById(targetId);
    if (!target) return;

    const note = target.cloneNode(true);
    note.querySelectorAll("a[href^='#fnref']").forEach((backlink) => backlink.remove());

    const preview = document.createElement("span");
    preview.className = "footnote-preview";

    const numberLink = document.createElement("a");
    numberLink.href = link.getAttribute("href");
    numberLink.textContent = `[${link.textContent.trim()}]`;
    preview.append(numberLink, " ");

    // Copy the footnote's HTML so links and inline formatting remain functional.
    Array.from(note.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "P") {
        while (node.firstChild) preview.appendChild(node.firstChild);
        preview.append(" ");
      } else {
        preview.appendChild(node);
      }
    });

    link.parentElement.appendChild(preview);
    link.parentElement.classList.add("has-footnote-preview");

    const show = () => preview.classList.add("is-visible");
    const hide = () => preview.classList.remove("is-visible");
    link.parentElement.addEventListener("mouseenter", show);
    link.parentElement.addEventListener("mouseleave", hide);
    link.addEventListener("focus", show);
    link.addEventListener("blur", hide);
  });
});
