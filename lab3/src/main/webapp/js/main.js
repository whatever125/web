import Canvas from './Canvas.js';
import CustomStorage from "./CustomStorage.js";
import Validator from './Validator.js';

document.addEventListener("DOMContentLoaded", function () {
    // console.log("DOMContentLoaded");

    const customStorage = new CustomStorage();

    // defineCanvas canvas, draw grid
    const canvas = new Canvas("canvas");
    // console.log("drew canvas");

    // redraw canvas on window resize
    window.addEventListener("resize", function () {
        // console.log("resize");
        canvas.redraw();
        drawResults(customStorage.getResults());
    });

    // send request on canvas click
    canvas.canvas.addEventListener("click", function (event) {
        // console.log("click");
        // Get the click coordinates relative to the canvas
        let rect = canvas.canvas.getBoundingClientRect();
        let x_coordinate = event.clientX - rect.left;
        let y_coordinate = event.clientY - rect.top;
        let [x, y] = canvas.coordsToAxis(x_coordinate, y_coordinate);
        x = parseFloat((x).toFixed(3));
        y = parseFloat((y).toFixed(3));
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
        document.getElementById("imsg").innerHTML = "&#160;";
        return sendAjaxGetRequest(x, y);
    });

    function sendAjaxGetRequest(x, y) {
        document.getElementById("graphSelect:graphX").value = x;
        document.getElementById("graphSelect:graphY").value = y;
        // console.log("sending coords to the server...");
        updateBeanValues();
    }

    window.drawResult = function( x, y, r, success){
        let result = {
            x: x,
            y: y,
            r: r,
            success: success
        };
        // console.log("draw");
        // console.log(result);
        customStorage.addResult(result);
        canvas.drawResult(result);
    }

    window.saveResult = function( x, y, r, success){
        let result = {
            x: x,
            y: y,
            r: r,
            success: success
        };
        // console.log("save");
        // console.log(result);
        customStorage.addResult(result);
    }

    // redraw previous results on radius change
    window.updateCanvas = function(radius) {
        // console.log("update");
        // console.log(radius);
        canvas.setRadius(radius);
        redrawCanvas();
    }

    // redraw previous results on radius change
    window.redrawCanvas = function() {
        // console.log("redraw");
        canvas.clear();
        canvas.redraw();
        drawResults(customStorage.getResults());
    }

    window.drawResults = function(results) {
        // console.log("results");
        // console.log(results);
        results.forEach((result) => canvas.drawResult(result));
    }

    // redraw previous results on radius change
    window.clearCanvas = function() {
        // console.log("clear");
        customStorage.clear();
        redrawCanvas();
    }
});