<?php
require_once __DIR__ . '/../models/Adjustment.php';
require_once __DIR__ . '/../models/Product.php';

class AdjusmentController {
    private $adjustment;
    private $product;

    public function __construct() {
        // Initialize the database connection
        $db = (new Database())->connect();
        
        // Initialize the models
        $this->adjustment = new Adjustment($db);
        $this->product = new Product($db);
    }

    // Get all adjustments
    public function getAdjustments() {
        try {
            // Fetch all adjustments from the model
            $adjustments = $this->adjustment->getAdjustments();
            echo json_encode($adjustments);
        } catch (Exception $e) {
            error_log("Error in getAdjustments: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Failed to fetch adjustments.']);
        }
    }

    // Create an adjustment
    public function createAdjustment($data) {
        try {
            // Get product by ID to validate stock update
            $product = $this->product->getProductById($data['productId']);
            if (!$product) {
                throw new Exception('Product not found.');
            }

            // Update product stock based on the adjustment type (add/remove)
            if ($data['adjustmentType'] === 'Increase') {
                $newQuantity = $product['stock_quantity'] + $data['quantity'];
            } elseif ($data['adjustmentType'] === 'Decrease') {
                $newQuantity = $product['stock_quantity'] - $data['quantity'];
            }

            // Save the adjustment
            $result = $this->adjustment->createAdjustment($data['productId'],$data['user_id'],$data['adjustmentType'], $data['quantity'], $data['reason']); 
            if ($result) {
                // Update the stock quantity in the product table
                $this->product->updateStockQuantity($data['productId'], $newQuantity);
                return json_encode(['success' => true, 'message' => 'Adjustment saved successfully.']);
            } else {
                throw new Exception("Failed to save adjustment.");
            }
        } catch (Exception $e) {
            error_log("Error in createAdjustment: " . $e->getMessage());
            return json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    // Update an existing adjustment (if needed)
    public function updateAdjustment($data) {
        try {
            $result = $this->adjustment->updateAdjustment($data);
            echo json_encode(['success' => $result]);
        } catch (Exception $e) {
            error_log("Error in updateAdjustment: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Failed to update adjustment.']);
        }
    }

    // Delete an adjustment
    public function deleteAdjustment($id) {
        try {
            $result = $this->adjustment->deleteAdjustment($id);
            echo json_encode(['success' => $result]);
        } catch (Exception $e) {
            error_log("Error in deleteAdjustment: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Failed to delete adjustment.']);
        }
    }
}
?>
