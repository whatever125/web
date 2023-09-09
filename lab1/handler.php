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

if (isset($_GET)) {
    echo("X:" . (float)htmlspecialchars($_GET['delta_x']));
    print("Y:" . (float)htmlspecialchars($_GET['delta_y']));
    print("Z:" . (float)htmlspecialchars($_GET['delta_z']));
}

?>