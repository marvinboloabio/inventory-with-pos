<?php
class User {
    private $conn;
    private $table = 'users';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getSuppliers() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getIdByUsername($data) {
        $query = "SELECT id , username FROM " . $this->table . " WHERE username = :username AND password = :password LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $data['username']);
        $stmt->bindParam(":password", $data['password']);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC); // Return a single row
    }
    
    

    public function createSupplier($data) {
        $query = "INSERT INTO " . $this->table . " (username, password, email, role) VALUES (:username, :password, :email, :role)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updateSupplier($data) {
        $query = "UPDATE " . $this->table . " SET name=:name, contact=:contact, email=:email, address=:address WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function deleteSupplier($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute(['id' => $id]);
    }
}
