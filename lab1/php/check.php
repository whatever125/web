<?php
header("Content-Type: application/json");

$start_time = microtime(true);

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET');
    echo 'Only GET requests are allowed.';
    exit;
}

if (!isset($_GET["delta_x"], $_GET["delta_y"], $_GET["delta_r"])) {
    header('HTTP/1.1 400 Bad Request');
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

// check validity
if (!validate_input($_GET["delta_x"], $_GET["delta_y"], $_GET["delta_r"])) {
    header('HTTP/1.1 422 Unprocessable Entity');
    echo json_encode(["error" => "Invalid input data"]);
    exit;
}

// Get input data from the request
$delta_x = floatval($_GET["delta_x"]);
$delta_y = floatval($_GET["delta_y"]);
$delta_r = floatval($_GET["delta_r"]);

// check if input is valid
$success = test_input($delta_x, $delta_y, $delta_r);

// calculate execution time
$execution_time = round((microtime(true) - $start_time) * pow(10, 6), 2);

// Send a JSON response with result, current time, and execution time
$response = [
    "delta_x" => $delta_x,
    "delta_y" => $delta_y,
    "delta_r" => $delta_r,
    "success" => $success,
    "current_time" => date("H:i:s"),
    "execution_time" => $execution_time
];

echo json_encode($response);

// check if input is correct
function validate_input(string $delta_x, string $delta_y, string $delta_r): bool {
    return is_numeric($delta_x) && is_numeric($delta_y) && is_numeric($delta_r) 
        && in_array($delta_x, array(-2, -1.5, -1, -0.5, 0, 1, 1.5, 2))
        && $delta_y >= -5 && $delta_y <= 3
        && in_array($delta_r, array(1, 1.5, 2, 2.5, 3));
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