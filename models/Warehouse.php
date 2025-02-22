<?php
class Warehouse {
    private $conn;
    private $table = 'warehouses';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getSuppliers() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY warehouse_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSupplier($data) {
        $query = "INSERT INTO " . $this->table . " (warehouse_name,location,description) VALUES (:name,:location,:description)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    } 

    public function updateSupplier($data) {
        $query = "UPDATE " . $this->table . " SET warehouse_name=:name,location=:location, description=:description WHERE warehouse_id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }
}
