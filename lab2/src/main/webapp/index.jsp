<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!doctype html>

<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>WEB. Lab 2</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,700;1,200;1,400;1,700&display=swap">
        <link rel="stylesheet" href="css/main.css">
        <script type="module" src="js/index.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <header>
            <h1>Колмаков Дмитрий Владимирович</h1>
            <h2>P3231 Вариант 1207</h2>
            <!-- <span id="clock"></span> -->
        </header>

        <form id="queryForm" method="GET" action="controller">
            <table id="userInputTable">
                <tr class="form-tr">
                    <td class="form-td" id="formFirstColumn">
                        <p>Выберите значение <strong>X</strong>:</p>

                        <input type="radio" id="x_minus_2" name="x" value="-2">
                        <label for="x_minus_2">-2</label>
                        <br>

                        <input type="radio" id="x_minus_1.5" name="x" value="-1.5">
                        <label for="x_minus_1.5">-1.5</label>
                        <br>

                        <input type="radio" id="x_minus_1" name="x" value="-1">
                        <label for="x_minus_1">-1</label>
                        <br>

                        <input type="radio" id="x_minus_0.5" name="x" value="-0.5">
                        <label for="x_minus_0.5">-0.5</label>
                        <br>

                        <input type="radio" id="x_zero" name="x" value="0">
                        <label for="x_zero">0</label>
                        <br>

                        <input type="radio" id="x_plus_0.5" name="x" value="0.5">
                        <label for="x_plus_0.5">0.5</label>
                        <br>

                        <input type="radio" id="x_plus_1" name="x" value="1">
                        <label for="x_plus_1">1</label>
                        <br>

                        <input type="radio" id="x_plus_1.5" name="x" value="1.5">
                        <label for="x_plus_1.5">1.5</label>
                        <br>

                        <input type="radio" id="x_plus_2" name="x" value="2">
                        <label for="x_plus_2">2</label>
                    </td>

                    <td class="form-td">
                        <p><label for="y">Введите значение <strong>Y</strong>:</label></p>
                        <input type="text" id="y" name="y" maxlength="10" required
                            pattern="^\s*(?:(-0*[0-4]?(?:[\.,][0-9]*)?)|(-0*5)|(\+?0*[0-2]?(?:[\.,][0-9]*)?)|(\+?0*3))\s*$"
                            oninvalid="this.setCustomValidity('Введите число, удовлетворяющее условиям')"
                            oninput="this.setCustomValidity('')">
                        <br>
                        <span id="y-helper-text">Введите число от -5 до 3</span>
                        <br>

                        <p class="label-r"><label for="r">Выберите значение <strong>R</strong>:</label></p>
                        <select name="r" id="r" required title="Please select an option">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3" selected>3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </td>

                    <td class="form-td">
                        <canvas id="canvas"></canvas>
                        <div id="imsg" style="font-weight:700;color:#ff5275"></div>
                    </td>
                </tr>
            </table>

            <table id="submitTable">
                <tr class="form-submit-tr">
                    <td class="form-submit-td">
                        <input type="submit" id="submitButton" class="submit-button" value="Отправить">
<%--                        <input type="button" id="clearButton" class="submit-button secondary" value="Очистить">--%>
                    </td>
                </tr>
            </table>
        </form>

        <jsp:include page="resultsTable.jsp"/>

    </body>
</html>