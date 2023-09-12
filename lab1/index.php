<!doctype html>

<?php

// start session
session_start();

// define variables for new attempt
$delta_x = $delta_y = $delta_r = null;

date_default_timezone_set("Europe/Moscow");
$current_time = date("H:i:s");
$start_time = microtime(true);

// define constants for table generation
const table_head = "<table>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Результат</th>
        <th>Текущее время</th>
        <th>Время работы</th>
    </tr>";

const table_tail = "</table>";


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // add empty array for new session
    if (!isset($_SESSION["results"])) {
        $_SESSION["results"] = array();
    }

    // add new attempt to the session array
    if (isset($_GET["delta_x"]) && isset($_GET["delta_y"]) && isset($_GET["delta_r"])) {
        $delta_x = floatval($_GET["delta_x"]);
        $delta_y = floatval($_GET["delta_y"]);
        $delta_r = floatval($_GET["delta_r"]);
    
        $execution_time = round((microtime(true) - $start_time) * pow(10, 6), 2);
    
        $new_result = array(
            "delta_x" => $delta_x,
            "delta_y" => $delta_y,
            "delta_r" => $delta_r,
            "success" => test_input($delta_x, $delta_y, $delta_r) ? "Попадание" : "Промах",
            "current_time" => $current_time,
            "execution_time" => $execution_time
        );
    
        $_SESSION["results"][] = $new_result;
    }
}

// check if attempt was successful
function test_input(float $delta_x, float $delta_y, float $delta_r): bool {
    if ($delta_x >= 0 && $delta_y <= 0) {
        return pow($delta_x, 2) + pow($delta_y, 2) <= pow($delta_r, 2);
    }
    if ($delta_x <= 0 && $delta_y >= 0) {
        return abs($delta_x) + abs($delta_y) <= $delta_r;
    }
    if ($delta_x < 0 && $delta_y < 0) {
        return (abs($delta_x) <= $delta_r / 2) && (abs($delta_y) <= $delta_r);
    }
    return false;
}
?>

<html>
    <head>
        <title>WEB. Lab 1</title>
    </head>

    <body>
        <header>
            <h1>Колмаков Дмитрий Владимирович</h1>
            <h3>P3231 ИСУ:368328</h3>
        </header>

        <form method="GET" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <table>
                <tr>
                    <td valign="top" width="25%">
                        <p>Выберите значение X:</p>

                        <input type="radio" id="x_minus_2" name="delta_x" value="-2">
                        <label for="x_minus_2">-2</label>
                        <br>

                        <input type="radio" id="x_minus_1.5" name="delta_x" value="-1.5">
                        <label for="x_minus_1.5">-1.5</label>
                        <br>

                        <input type="radio" id="x_minus_1" name="delta_x" value="-1">
                        <label for="x_minus_1">-1</label>
                        <br>

                        <input type="radio" id="x_minus_0.5" name="delta_x" value="-0.5">
                        <label for="x_minus_0.5">-0.5</label>
                        <br>

                        <input type="radio" id="x_zero" name="delta_x" value="0">
                        <label for="x_zero">0</label>
                        <br>

                        <input type="radio" id="x_plus_0.5" name="delta_x" value="0.5">
                        <label for="x_plus_0.5">0.5</label>
                        <br>

                        <input type="radio" id="x_plus_1" name="delta_x" value="1">
                        <label for="x_plus_1">1</label>
                        <br>

                        <input type="radio" id="x_plus_1.5" name="delta_x" value="1.5">
                        <label for="x_plus_1.5">1.5</label>
                        <br>

                        <input type="radio" id="x_plus_2" name="delta_x" value="2">
                        <label for="x_plus_2">2</label>
                    </td>

                    <td valign="top" width="25%">
                        <p>Введите значение Y:</p>
                        <input type="text" id="delta_y" name="delta_y">
                    </td>

                    <td valign="top" width="25%">
                        <p>Выберите значение R:</p>

                        <input type="checkbox" id="r_plus_1" name="delta_r" value="1">
                        <label for="r_plus_1">1</label>
                        <br>

                        <input type="checkbox" id="r_plus_1.5" name="delta_r" value="1.5">
                        <label for="r_plus_1.5">1.5</label>
                        <br>

                        <input type="checkbox" id="r_plus_2" name="delta_r" value="2">
                        <label for="r_plus_2">2</label>
                        <br>

                        <input type="checkbox" id="r_plus_2.5" name="delta_r" value="2.5">
                        <label for="r_plus_2.5">2.5</label>
                        <br>

                        <input type="checkbox" id="r_plus_3" name="delta_r" value="3">
                        <label for="r_plus_3">3</label>
                    </td>

                    <td valign="top" width="25%">
                        <img src="./areas.png" alt="areas" width="100%">
                    </td>
                </tr>

                <tr>
                    <td>
                        <input type="submit" value="Отправить">
                    </td>
                </tr>
            </table>
        </form>

        <!-- add rendered table -->
        <?php echo RenderTable(); ?>
        
    </body>
</html>

<?php
// render table using session data
function RenderTable() : string {
    $final_table = "";

    $final_table .= table_head;

    foreach ($_SESSION["results"] as $row) {
        $final_table .= "<tr>";
        $final_table .= "<td>" . $row["delta_x"] . "</td>";
        $final_table .= "<td>" . $row["delta_y"] . "</td>";
        $final_table .= "<td>" . $row["delta_r"] . "</td>";
        $final_table .= "<td>" . $row["success"] . "</td>";
        $final_table .= "<td>" . $row["current_time"] . "</td>";
        $final_table .= "<td>" . $row["execution_time"] . "</td>";
        $final_table .= "</tr>";
    }

    $final_table .= table_tail;

    return $final_table;
}
?>