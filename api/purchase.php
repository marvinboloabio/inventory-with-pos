<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/PurchaseController.php';

$controller = new PurchaseController();
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Get the data sent by the client
$data = json_decode(file_get_contents("php://input"), true);
if ($method === 'GET') {
    if (isset($_GET['poID'])){
        $controller->getPurchaseByID($data);
    }else {
        $controller->getProducts();
    }
} elseif ($method === 'POST' && strpos($requestUri, '/purchase') !== false) {
    // Create an adjustment
    echo $controller->createPurchase($data);
} elseif ($method === 'PUT' && strpos($requestUri, '/purchase') !== false) {
    // Update an adjustment
    if( $purchaseID = $data['purchaseID'] && $data['statusReceived']){
        echo $controller->updateToReceivedStatus($data);
    } else if ( $purchaseID = $data['purchaseID'] && $data['statusCancelled']) {
        echo $controller->updateToCancelledStatus($data);
    } else {
        echo $controller->updatePurchase($data);
    }
   
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method or URL']);
}
