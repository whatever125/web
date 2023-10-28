import Canvas from './Canvas.js';
import CheckboxGroup from "./CheckboxGroup.js";
import CustomStorage from "./CustomStorage.js";
import RadioGroup from "./RadioGroup.js";
import TextInput from "./TextInput.js";
import Validator from './Validator.js';

document.addEventListener("DOMContentLoaded", function () {
    // define all needed variables
    const resultsTableBody = document.querySelector("#resultsTable tbody");
    const queryForm = document.getElementById("queryForm");
    const clearButton = document.getElementById("clearButton");
    
    const radioGroup = new RadioGroup("delta_x");
    const textInput = new TextInput("delta_y");
    const checkboxGroup = new CheckboxGroup("delta_r");
    const customStorage = new CustomStorage();

    // define canvas, draw grid
    const canvas = new Canvas("canvas");

    checkboxGroup.select(4);
    canvas.define();
    canvas.redraw();

    // redraw canvas on window resize
    window.addEventListener("resize", function () {
        canvas.define();
        canvas.redraw();
    });

    // make checkbox group select only one
    checkboxGroup.restrictSelectOne();
    radioGroup.defineCustomValidity();

    // Display initial previous results
    let previousResults = customStorage.getResults();
    displayResults(previousResults);

    // clear button
    clearButton.addEventListener("click", function (e) {
        customStorage.clear();
        displayResults(customStorage.getResults());
    });

    // handle form submit
    queryForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // If none of the radioButtons is checked, set custom validity message and return false to prevent form submission
        if (!radioGroup.isAnyChecked()) {
            radioGroup.setValidityMessage(0, "Выберите одно из значений");
            return false;
        }
        // If none of the checkboxes is checked, set custom validity message and return false to prevent form submission
        if (!checkboxGroup.isAnyChecked()) {
            checkboxGroup.setValidityMessage(0, "Выберите одно из значений");
            return false;
        }

        // Get user input
        const delta_x = radioGroup.getSelectedValue().trim().replace(",", ".");
        const delta_y = textInput.getValue().trim().replace(",", ".");
        const delta_r = checkboxGroup.getSelectedValues()[0].trim().replace(",", ".");

        // validte input
        if (!Validator.isValidX(delta_x)) {
            radioGroup.setValidityMessage(0, 'X не удовлетворяет условию (-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2)');
            return false;
        }
        if (!Validator.isValidY(delta_y)) {
            textInput.setValidityMessage('Y не удовлетворяет условию (-5 <= y <= 3)');
            return false;
        }
        if (!Validator.isValidR(delta_r)) {
            checkboxGroup.setValidityMessage(0, "R не удовлетворяет условию (1, 1.5, 2, 2.5, 3)");
            return false;
        }

        sendAjaxGetRequest(delta_x, delta_y, delta_r);

        return true;
    });

    function sendAjaxGetRequest(delta_x, delta_y, delta_r) {
        // Construct the URL with query parameters
        let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const url = `php/main.php?delta_x=${delta_x}&delta_y=${delta_y}&delta_r=${delta_r}&tz=${tz}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error code! Status: ${response.status}`);
                }
                return response.text();
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
        resultsTableBody.prepend(row);
        row.outerHTML = result;
    }
});