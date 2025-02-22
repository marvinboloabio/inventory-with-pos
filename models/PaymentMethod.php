<?php
class PaymentMethod {
    private $conn;
    private $table = 'payment_methods';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getSuppliers() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY payment_method_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSupplier($data) {
        $query = "INSERT INTO " . $this->table . " (name) VALUES (:name)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    } 

    public function updateSupplier($data) {
        $query = "UPDATE " . $this->table . " SET name=:name WHERE payment_method_id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }
}
