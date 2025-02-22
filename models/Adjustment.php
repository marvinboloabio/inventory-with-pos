<?php
class Adjustment {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    // Get all adjustments
    public function getAdjustments() {
        $query = "SELECT * FROM inventory_adjustments";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Create a new adjustment
    public function createAdjustment($productId, $user_id, $adjustmentType, $quantity, $reason) {
        $query = "INSERT INTO inventory_adjustments (product_id, user_id, adjustment_type, quantity, reason) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$productId, $user_id, $adjustmentType, $quantity, $reason]);
    }

    // Update an existing adjustment (optional)
    public function updateAdjustment($data) {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE inventory_adjustments SET adjustment_type = ?, quantity = ?, reason = ? WHERE adjustment_id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$data['adjustmentType'], $data['quantity'], $data['reason'], $data['adjustmentId']]);
    }

    // Delete an adjustment
    public function deleteAdjustment($id) {
        $query = "DELETE FROM inventory_adjustments WHERE adjustment_id = ?";
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id]);
    }
}
?>
