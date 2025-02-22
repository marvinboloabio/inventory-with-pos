<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/AdjusmentController.php';

// Create an instance of the controller
$adjustmentController = new AdjusmentController();

// Check the request method and route accordingly
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Get the data sent by the client
$data = json_decode(file_get_contents("php://input"), true);

if ($method === 'GET') {
    // Fetch all adjustments
    $adjustmentController->getAdjustments();
} elseif ($method === 'POST' && strpos($requestUri, '/adjustment') !== false) {
    // Create an adjustment
    echo $adjustmentController->createAdjustment($data);
} elseif ($method === 'PUT' && strpos($requestUri, '/adjustment') !== false) {
    // Update an adjustment
    echo $adjustmentController->updateAdjustment($data);
} elseif ($method === 'DELETE' && strpos($requestUri, '/adjustment') !== false) {
    // Delete an adjustment
    $id = isset($data['id']) ? $data['id'] : null;
    $adjustmentController->deleteAdjustment($id);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method or URL']);
}
?>
