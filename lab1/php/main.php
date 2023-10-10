<?php
require __DIR__ . "/AreaChecker.php";
require __DIR__ . "/InputValidator.php";

header("Content-Type: application/json");

$start_time = microtime(true);

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    header('Allow: GET');
    echo 'Only GET requests are allowed.';
    exit;
}

if (!isset($_GET["delta_x"], $_GET["delta_y"], $_GET["delta_r"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required parameters"]);
    exit;
}

if (isset($_GET["tz"])) {
    try {
        new DateTimeZone($_GET["tz"]);
        date_default_timezone_set($_GET["tz"]);
    } catch(Exception $e){
        // date_default_timezone_set("Europe/Moscow");
    }
}

// check input data validity
$validator = new InputValidator($_GET["delta_x"], $_GET["delta_y"], $_GET["delta_r"]);
if (!$validator->is_valid()) {
    http_response_code(422);
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

// Get input data from the request
$delta_x = floatval($_GET["delta_x"]);
$delta_y = floatval($_GET["delta_y"]);
$delta_r = floatval($_GET["delta_r"]);

// check if attempt was successful
$success = AreaChecker::is_in_area($delta_x, $delta_y, $delta_r);

// calculate execution time
$execution_time = round((microtime(true) - $start_time) * pow(10, 6), 2);

// Send a response with result, current time, and execution time
echo "<tr>";
echo "<td>" . $delta_x . "</td>";
echo "<td>" . $delta_y . "</td>";
echo "<td>" . $delta_r . "</td>";
echo "<td " . ($success ? "class='td-success'>Попадание" : "class='td-fail'>Промах") . "</td>";
echo "<td>" . date("H:i:s") . "</td>";
echo "<td>" . $execution_time . " ms</td>";
echo "</tr>";
