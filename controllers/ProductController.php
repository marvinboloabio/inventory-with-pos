<?php
require_once __DIR__ . '/../models/Product.php';

class ProductController {
    private $product;

    public function __construct() {
        $db = (new Database())->connect();
        $this->product = new Product($db);
    }

    public function getProducts() {
        echo json_encode($this->product->getProducts());
    }

    public function getProductsByID($salesProductID) {
        echo json_encode($this->product->getProductsByID($salesProductID));
    }

    public function createProduct($data) {
        if ($this->product->createProduct($data)) {
            http_response_code(201);
            echo json_encode(['message' => 'Product created successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to create product.']);
        }
    }

    public function updateSalesCancelledStatus($data) {

        try {
            // Save the adjustment
            $result = $this->product->updateSalesCancelledStatus($data);
            if ($result) {
                // Update the stock quantity in the product table
                return json_encode(['success' => true, 'message' => 'Product updated successfully.']);
            } else {
                throw new Exception("Failed to update product.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updateProduct($data) {
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Product ID is required for updating.']);
            return;
        }
        if ($this->product->updateProduct($data)) {
            echo json_encode(['message' => 'Product updated successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to update product.']);
        }
    }

    public function deleteProduct($id) {
        if ($this->product->deleteProduct($id)) {
            echo json_encode(['message' => 'Product deleted successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Failed to delete product.']);
        }
    }
}
?>
