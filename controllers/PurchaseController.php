<?php
require_once __DIR__ . '/../models/Purchase.php';
require_once __DIR__ . '/../models/Product.php';

class PurchaseController {
    private $purchase;
    private $product;
   

    public function __construct() {
        $db = (new Database())->connect();
        $this->purchase = new Purchase($db);
        $this->product = new Product($db);
    }

    public function getProducts() {
        echo json_encode($this->purchase->getPurchase());
    }
    
    public function getPurchaseByID($data) {
        echo json_encode($this->purchase->getPurchaseByID($data));
    }

    public function createPurchase($data) {
        try {
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($data['product']);
            if (!$product) {
                throw new Exception('Product not found.');
            }

            // Update product stock based on the adjustment type (add/remove)
            if($data['status'] === "Received"){
                $newQuantity = $product['stock_quantity'] + $data['qty'];
            } else if ($data['status'] === "Pending") {
                $newQuantity = $product['stock_quantity'];
            }
          
            // Save the adjustment
            $result = $this->purchase->createPurchase($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($data['product'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Adjustment saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updatePurchase($data) {
        try {
            $purchase = $this->purchase->getProductIdByPurchaseId($data['purchaseID']);
            if (!$purchase) {
                throw new Exception('Product ID not found.');
            }
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($purchase['product_id']);
            if (!$product) {
                throw new Exception('Product not found.');
            }
    
            // Update product stock based on the adjustment type (add/remove)
       
            $newQuantity = $product['stock_quantity'] + $purchase['quantity'];
    
            // Save the adjustment
            $result = $this->purchase->updateToReceivedStatus($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($purchase['product_id'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Adjustment saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function updateToReceivedStatus($data) {
        try {
            $purchase = $this->purchase->getProductIdByPurchaseId($data['purchaseID']);
            if (!$purchase) {
                throw new Exception('Product ID not found.');
            }
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($purchase['product_id']);
            if (!$product) {
                throw new Exception('Product not found.');
            }
    
            // Update product stock based on the adjustment type (add/remove)
       
            $newQuantity = $product['stock_quantity'] + $purchase['quantity'];
    
            // Save the adjustment
            $result = $this->purchase->updateToReceivedStatus($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($purchase['product_id'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Adjustment saved successfully.']);
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
            $purchase = $this->purchase->getProductIdByPurchaseId($data['purchaseID']);
            if (!$purchase) {
                throw new Exception('Product ID not found.');
            }
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($purchase['product_id']);
            if (!$product) {
                throw new Exception('Product not found.');
            }
    
            // Update product stock based on the adjustment type (add/remove)
       
            $newQuantity = $product['stock_quantity'] - $purchase['quantity'];
    
            // Save the adjustment
            $result = $this->purchase->updateToCancelledStatus($data);
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($purchase['product_id'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Adjustment saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
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
