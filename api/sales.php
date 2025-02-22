<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/SaleController.php';

$controller = new SaleController();
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Get the data sent by the client
$data = json_decode(file_get_contents("php://input"), true);

if ($method === 'GET') {
    $controller->getProducts();
} elseif ($method === 'POST' && strpos($requestUri, '/sales') !== false) {
    // Create an adjustment
    echo $controller->createSales($data);
} elseif ($method === 'PUT' && strpos($requestUri, '/sales') !== false) {
    // Update an adjustment
    if( $data['salesID']){
        echo $controller->updateSalesCancelledStatus($data);
    } else {
        echo $controller->updateSales($salesID);
    }
    
    
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method or URL']);
}

