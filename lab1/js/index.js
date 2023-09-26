import Canvas from './Canvas.js';
import CheckboxGroup from "./CheckboxGroup.js";
import CustomStorage from "./CustomStorage.js";
import RadioGroup from "./RadioGroup.js";
import TextInput from "./TextInput.js";

document.addEventListener("DOMContentLoaded", function () {
    // define all needed variables
    const resultsTableBody = document.querySelector("#resultsTable tbody");
    const queryForm = document.getElementById("queryForm");
    const clearButton = document.getElementById("clearButton");
    
    const radioGroup = new RadioGroup("delta_x");
    const textInput = new TextInput("delta_y");
    const checkboxGroup = new CheckboxGroup("delta_r");
    const customStorage = new CustomStorage();

    const canvas = new Canvas("canvas");

    // define canvas, draw grid
    canvas.define();
    canvas.drawGrid();

    // add clock
    // var span = document.getElementById('clock');
    // function time() {
    // var d = new Date();
    // var s = d.getSeconds();
    // var m = d.getMinutes();
    // var h = d.getHours();
    // span.textContent = 
    //     ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    // }
    // setInterval(time, 1000);


    // make checkbox group select only one
    checkboxGroup.restrictSelectOne();
    radioGroup.defineCustomValidity();

    // Display initial previous results
    let previousResults = customStorage.getResults();
    displayResults(previousResults);

    // handle form submit
    queryForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // If none of the checkboxes is checked, set custom validity message and return false to prevent form submission
        if (!checkboxGroup.isAnyChecked()) {
            checkboxGroup.setValidityMessage(0, "Выберите одно из значений")
            return false;
        }

        // Get user input
        const delta_x = radioGroup.getSelectedValue();
        const delta_y = textInput.getValue().trim().replace(",", ".");
        const delta_r = checkboxGroup.getSelectedValues()[0];

        sendAjaxGetRequest(delta_x, delta_y, delta_r);

        // Clear the input field
        radioGroup.clear();
        textInput.clear();
        checkboxGroup.clear();
        canvas.clear();
        canvas.drawGrid();
        return true;
    });

    // clear button
    clearButton.addEventListener("click", function (e) {
        customStorage.clear();
        displayResults(customStorage.getResults());
    });

    function sendAjaxGetRequest(delta_x, delta_y, delta_r) {
        // Construct the URL with query parameters
        let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const url = `php/check.php?delta_x=${delta_x}&delta_y=${delta_y}&delta_r=${delta_r}&tz=${tz}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error code! Status: ${response.status}`);
                }
                return response.json()
            })
            .then((result) => {
                customStorage.addResult(result);
                addResultRow(result);
            })
            .catch((error) => {
                console.error("Error fetching data:\n", error);
            });
    }

    function displayResults(results) {
        resultsTableBody.innerHTML = "";
        results.forEach((result) => addResultRow(result));
    }

    function addResultRow(result) {
        // Iterate over the response data and add rows to the table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.delta_x}</td>
            <td>${result.delta_y}</td>
            <td>${result.delta_r}</td>
            <td ${result.success ? "class='td-success'> Попадание" : "class='td-fail'> Промах"}</td>
            <td>${result.current_time}</td>
            <td>${result.execution_time} ms</td>
        `;
        resultsTableBody.prepend(row);
    }
});