<?php
session_start(); // Start the session
header('Content-Type: application/json');

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/LoginController.php';

$loginController = new LoginController();
$method = $_SERVER['REQUEST_METHOD'];

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON data"]);
    exit;
}

if ($method === 'POST') {
    $response = $loginController->getIdByUsername($data);

    if ($response["success"]) {
        $_SESSION['user_id'] = $response['id']; // Store user ID in session
        $_SESSION['user_name'] = $response['username']; // Store user ID in session
    }

    echo json_encode($response);
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
