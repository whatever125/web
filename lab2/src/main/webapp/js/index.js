import Canvas from './Canvas.js';
import CustomStorage from "./CustomStorage.js";
import RadioGroup from "./RadioGroup.js";
import TextInput from "./TextInput.js";
import Validator from './Validator.js';
import Selector from "./Selector.js";

document.addEventListener("DOMContentLoaded", function () {
    // defineCanvas all needed variables
    const resultsTableBody = document.querySelector("#resultsTable tbody");
    const queryForm = document.getElementById("queryForm");
    // const clearButton = document.getElementById("clearButton");
    
    const radioGroup = new RadioGroup("x");
    const textInput = new TextInput("y");
    const selector = new Selector("r");
    const customStorage = new CustomStorage();

    radioGroup.defineCustomValidity();

    // Clear previous results on canvas on radius change
    selector.selector.addEventListener('change', function() {
        selector.setValidityMessage("");
        // customStorage.clear(); // clear storage
        canvas.clear();
        canvas.setRadius(selector.getValue());
        canvas.redraw();
        drawResults(customStorage.getResults());
    });

    // defineCanvas canvas, draw grid
    const canvas = new Canvas("canvas");
    canvas.setRadius(3);
    canvas.redraw();
    drawResults(customStorage.getResults());

    // redraw canvas on window resize
    window.addEventListener("resize", function () {
        canvas.redraw();
        drawResults(customStorage.getResults());
    });

    // send request on canvas click
    canvas.canvas.addEventListener("click", function (event) {
        const r = selector.getValue().trim().replace(",", ".");
        // Get the click coordinates relative to the canvas
        let rect = canvas.canvas.getBoundingClientRect();
        let x_coordinate = event.clientX - rect.left;
        let y_coordinate = event.clientY - rect.top;
        let [x, y] = canvas.coordsToAxis(x_coordinate, y_coordinate);
        y = parseFloat((y).toFixed(2));
        // validate input
        if (!Validator.isValidX(x) && !Validator.isValidY(y)) {
            document.getElementById("imsg").innerHTML = "Значения X, Y вне области!";
            return false;
        }
        if (!Validator.isValidX(x)) {
            document.getElementById("imsg").innerHTML = "Значение X вне области!";
            return false;
        }
        if (!Validator.isValidY(y)) {
            document.getElementById("imsg").innerHTML = "Значение Y вне области!";
            return false;
        }
        document.getElementById("imsg").innerHTML = "";
        return sendAjaxGetRequest(x, y, r);
    });

    // clear button
    // clearButton.addEventListener("click", function (e) {
    //     customStorage.clear();
    //     resultsTableBody.innerHTML = "";
    //     canvas.redraw();
    // });

    // handle form submit
    queryForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // If none of the radioButtons is checked, set custom validity message and return false to prevent form submission
        if (!radioGroup.isAnyChecked()) {
            radioGroup.setValidityMessage(0, "Выберите одно из значений");
            return false;
        }

        // Get user input
        const x = radioGroup.getSelectedValue().trim().replace(",", ".");
        const y = textInput.getValue().trim().replace(",", ".");
        const r = selector.getValue().trim().replace(",", ".");

        // validate input
        if (!Validator.isValidX(x)) {
            radioGroup.setValidityMessage(0, 'X не удовлетворяет условию (-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2)');
            return false;
        }
        if (!Validator.isValidY(y)) {
            textInput.setValidityMessage('Y не удовлетворяет условию (-5 <= y <= 3)');
            return false;
        }
        if (!Validator.isValidR(r)) {
            selector.setValidityMessage("R не удовлетворяет условию (1, 2, 3, 4, 5)");
            return false;
        }

        return sendAjaxGetRequest(x, y, r);
    });

    function sendAjaxGetRequest(x, y, r) {
        // Construct the URL with query parameters
        let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const url = `controller?x=${x}&y=${y}&r=${r}&tz=${tz}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error code! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                // save result in storage
                customStorage.addResult(result);
                // add result to table
                addResultRow(result);
                // add result to canvas
                canvas.drawResult(result);
            })
            .catch((error) => {
                console.error("Error fetching data:\n", error);
            });
        return true;
    }

    function drawResults(results) {
        results.forEach((result) => canvas.drawResult(result));
    }

    function addResultRow(result) {
        // Iterate over the response data and add rows to the table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.x}</td>
            <td>${result.y}</td>
            <td>${result.r}</td>
            <td ${result.success ? "class='td-success'> Попадание" : "class='td-fail'> Промах"}</td>
            <td>${result.dateTime}</td>
            <td>${result.executionTime} ms</td>
        `;
        resultsTableBody.prepend(row);
    }
});