<?php

session_start();

const table_head = "
<table>
    <tr>
        <td>X</td>
        <td>Y</td>
        <td>R</td>
        <td>Результат</td>
        <td>Текущее время</td>
        <td>Время работы</td>
    </tr>
</table>";
const table_tail = '</table>';

$current_time = date("H:i:s");
$start_time = microtime(true);


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
        "success" => true,
        "current_time" => $current_time,
        "execution_time" => $execution_time
    );

    $_SESSION["results"][] = $new_result;

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array(
        "html" => RenderTable()
    ));
    exit();
}

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