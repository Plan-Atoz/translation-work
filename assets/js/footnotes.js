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

    preview.append("[");
    const numberLink = document.createElement("a");
    numberLink.href = link.getAttribute("href");
    numberLink.textContent = link.textContent.trim();
    preview.append(numberLink, "] ", document.createTextNode(content));

    link.parentElement.appendChild(preview);
    link.parentElement.classList.add("has-footnote-preview");

    const show = () => preview.classList.add("is-visible");
    const hide = () => preview.classList.remove("is-visible");
    link.parentElement.addEventListener("mouseenter", show);
    link.parentElement.addEventListener("mouseleave", hide);
    link.addEventListener("focus", show);
    link.addEventListener("blur", hide);
  });
  const root = document.querySelector(".markdown-body");
  if (root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!/[\u0022\u0027\u2018\u2019\u201C\u201D]/.test(node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.parentElement.closest("script, style, .quote-punctuation")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parts = node.nodeValue.split(/([\u0022\u0027\u2018\u2019\u201C\u201D])/g);
      if (parts.length < 2) return;
      const fragment = document.createDocumentFragment();
      parts.forEach((part) => {
        if (/^[\u0022\u0027\u2018\u2019\u201C\u201D]$/.test(part)) {
          const span = document.createElement("span");
          span.className = "quote-punctuation";
          span.textContent = part;
          fragment.appendChild(span);
        } else if (part) {
          fragment.appendChild(document.createTextNode(part));
        }
      });
      node.replaceWith(fragment);
    });
  }
});