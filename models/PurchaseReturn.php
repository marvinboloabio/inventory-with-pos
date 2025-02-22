<?php
class PurchaseReturn
{
    private $conn;
    private $table = 'purchase_returns';

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getReturns()
    {
        $query = "SELECT * FROM " . $this->table . " ORDER BY return_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createReturns($data)
    {
        $query = "INSERT INTO " . $this->table . " 
                  (user_id,po_id, product_id, quantity, return_date, reason) 
                  VALUES (:returnUserID,:poID, :returnProduct, :returnQty, :returnDate, :reason)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function getProductIdByReturnId($id)
    {
        $query = "SELECT product_id , quantity FROM " . $this->table . " WHERE return_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function updateStatus($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET replaced_date = :replacedDate, status = :status , updated_by = :updatedByID  WHERE return_id = :replacedReturnID";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updateToCancelledStatus($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET status = :statusCancelled, updated_by = :updatedByValue  WHERE return_id = :returnID";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);

    }
}
?>