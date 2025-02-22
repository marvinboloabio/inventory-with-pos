<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../controllers/ProductController.php';

$controller = new ProductController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['salesProductID']) && !empty($_GET['salesProductID'])) {
        // Fetch a specific product by ID
        $salesProductID = intval($_GET['salesProductID']); // Convert to integer for safety
        $controller->getProductsByID($salesProductID);
    } else {
        // Fetch all products
        $controller->getProducts();
    }
    exit; // Ensure no extra output is sent
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
        exit;
    }
    $controller->createProduct($data);
    exit;
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Update an adjustment
    if ($data['productID']) {
        echo $controller->updateSalesCancelledStatus($data);
    } else {
        echo $controller->updateProduct($data);
    }
} elseif ($method === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);

    if (isset($data['id'])) {
        $controller->deleteProduct($data['id']);
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
