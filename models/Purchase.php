<?php
class Purchase {
    private $conn;
    private $table = 'po_supplier';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getPurchase() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY po_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getPurchaseByID($data) {
        $query = "SELECT * FROM " . $this->table . " WHERE po_id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $stmt->fetch();
    }

    public function createPurchase($data) {
        $query = "INSERT INTO " . $this->table . " 
                  (user_id,supplier_id, product_id, order_date, quantity, unit_price, total_price , status) 
                  VALUES (:userID,:supplier, :product, :orderDate, :qty, :unitPrice, :totalPrice , :status)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updatePurchase($data) {
        $query = " UPDATE " . $this->table . " SET supplier_id = :supplier, product_id = :product, order_date = :orderDate , quantity = :qty , unit_price = :unitPrice, total_price = :totalPrice, status = :status WHERE po_id = :poID;
                  VALUES (:supplier, :product, :orderDate, :qty, :unitPrice, :totalPrice , :status , :poID)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    
    public function getProductIdByPurchaseId($id)
    {
        $query = "SELECT product_id , quantity FROM po_supplier WHERE po_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch();  
    }

    public function updateToReceivedStatus($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET status = :statusReceived  WHERE po_id = :purchaseID";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updateToCancelledStatus($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET status = :statusCancelled  WHERE po_id = :purchaseID";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }
}
?>
