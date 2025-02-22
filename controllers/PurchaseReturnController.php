<?php
require_once __DIR__ . '/../models/PurchaseReturn.php';
require_once __DIR__ . '/../models/Product.php';

class PurchaseReturnController {
    private $purchaseReturn;
    private $product;
   

    public function __construct() {
        $db = (new Database())->connect();
        $this->purchaseReturn = new PurchaseReturn($db);
        $this->product = new Product($db);
    }

    public function getReturns() {
        echo json_encode($this->purchaseReturn->getReturns());
    }

    public function createReturns($data) {
        try {
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($data['returnProduct']);
            if (!$product) {
                throw new Exception('Product not found.');
            }

            $newQuantity = $product['stock_quantity'] - $data['returnQty'];

            // Save the adjustment
            $result = $this->purchaseReturn->createReturns($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($data['returnProduct'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Purchase Returns saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updateStatus($data) {
        try {
            $return = $this->purchaseReturn->getProductIdByReturnId($data['replacedReturnID']);
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($return['product_id']);
            if (!$product) {
                throw new Exception(message: 'Product not found.');
            }

            $newQuantity = $product['stock_quantity'] + $return['quantity'];

            // Save the adjustment
            $result = $this->purchaseReturn->updateStatus($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($product['id'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Purchase Returns saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updateToCancelledStatus($data) {
        try {
            $return = $this->purchaseReturn->getProductIdByReturnId($data['returnID']);
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($return['product_id']);
            if (!$product) {
                throw new Exception(message: 'Product not found.');
            }

            $newQuantity = $product['stock_quantity'] - $return['quantity'];

            // Save the adjustment
            $result = $this->purchaseReturn->updateToCancelledStatus($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($product['id'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Purchase Returns saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

}
?>
