let count = 0;
$("div.lecture").each(() => {
    let words = $(this).text().split(" ");
    words.forEach((word) => {
        if (word == "де-факто") {
            count += 1;
        }
    });
});