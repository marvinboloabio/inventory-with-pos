<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/UOMController.php';

$controller = new UOMController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $controller->getSuppliers();
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        // If the data is not valid JSON, send an error response
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
        exit;
    }

    error_log("Creating supplier: " . print_r($data, true)); // Debug log

    // Call the controller to create the supplier
    $result = $controller->createSupplier($data);

    if ($result) {
        // Success response
        http_response_code(201); // Created
        echo json_encode(['status' => 'success', 'message' => 'Supplier created successfully']);
    } else {
        // Failure response
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Failed to create supplier']);
    }

    exit;
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id'])) {
        // If data or ID is missing, send a bad request error
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Supplier ID is required for update']);
        exit;
    }

    error_log("Updating supplier with ID: " . $data['id']); // Debug log
    $controller->updateSupplier($data);
} elseif ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);

    if (isset($data['id'])) {
        $controller->deleteSupplier($data['id']);
        echo json_encode(['status' => 'success', 'message' => 'Supplier deleted successfully']);
    } else {
        // If ID is missing in DELETE request, send error response
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Supplier ID is required for deletion']);
    }
} else {
    // For unsupported methods, send a 405 Method Not Allowed response
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
