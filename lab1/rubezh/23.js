document.querySelectorAll("input[type=text]").forEach(el => {
    el.addEventListener("keypress", event => {
        if (!event.key.match(/[a-zA-Z0-9]/)) {
            event.preventDefault();
        }
    });
});