<!doctype html>

<?php
$delta_x = $delta_y = $delta_r = null;

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

$current_time = date("H:i:s");
$start_time = microtime(true);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!isset($_SESSION["results"])) {
        $_SESSION["results"] = array();
    }

    if (isset($_GET["delta_x"]) && isset($_GET["delta_y"]) && isset($_GET["delta_r"])) {
        $delta_x = floatval($_GET["delta_x"]);
        $delta_y = floatval($_GET["delta_y"]);
        $delta_r = floatval($_GET["delta_r"]);
    
        $execution_time = microtime(true) - $start_time;
    
        $new_result = array(
            "delta_x" => $delta_x,
            "delta_y" => $delta_y,
            "delta_r" => $delta_r,
            "success" => test_input($delta_x, $delta_y, $delta_r),
            "current_time" => $current_time,
            "execution_time" => $execution_time
        );
    
        $_SESSION["results"][] = $new_result;
    
        /* header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array(
            "html" => RenderTable()
        ));
        exit(); */
    }
}

function test_input(float $delta_x, float $delta_y, float $delta_r): bool {
    return true;
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

        <?php echo RenderTable(); ?>
        
    </body>
</html>

<?php
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