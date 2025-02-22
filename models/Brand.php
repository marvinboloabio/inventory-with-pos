<?php
class Brand {
    private $conn;
    private $table = 'brands';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getSuppliers() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY brand_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSupplier($data) {
        $query = "INSERT INTO " . $this->table . " (brand_name, description) VALUES (:name, :description)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);   
    } 

    public function updateSupplier($data) {
        $query = "UPDATE " . $this->table . " SET brand_name=:name, description=:description WHERE brand_id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }
}
