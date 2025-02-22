<?php
class UOM {
    private $conn;
    private $table = 'uoms';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getSuppliers() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY uom_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSupplier($data) {
        $query = "INSERT INTO " . $this->table . " (uom_name, description) VALUES (:name, :description)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    } 

    public function updateSupplier($data) {
        $query = "UPDATE " . $this->table . " SET uom_name=:name, description=:description WHERE uom_id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }
}
