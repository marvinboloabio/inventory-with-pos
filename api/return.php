<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/PurchaseReturnController.php';

$controller = new PurchaseReturnController();
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Get the data sent by the client
$data = json_decode(file_get_contents("php://input"), true);

if ($method === 'GET') {
    $controller->getReturns();
} elseif ($method === 'POST' && strpos($requestUri, '/return') !== false) {
    // Create an adjustment
    echo $controller->createReturns($data);
}  elseif ($method === 'PUT' && strpos($requestUri, '/return') !== false) {
    // Create an adjustment
    if (isset($data['returnID']) && $data['statusCancelled']){
        echo $controller->updateToCancelledStatus($data);
    } else {
       echo $controller->updateStatus($data);
    }
    
}else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method or URL']);
}