document.querySelectorAll("a[href]").forEach(
    (link) => {
        link.innerHTML = link.getAttribute("href");
        link.removeChild("href");
    }
);