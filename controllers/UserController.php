<?php
require_once __DIR__ . '/../models/User.php';

class UserController {
    private $supplier;

    public function __construct() {
        $db = (new Database())->connect();
        $this->supplier = new User($db);
    }

    public function getSuppliers() {
        echo json_encode($this->supplier->getSuppliers());
    }

    public function createSupplier($data) {
        try {
            $result = $this->supplier->createSupplier($data);
            if ($result) {
                return true;
            } else {
                throw new Exception("Failed to create supplier.");
            }
        } catch (Exception $e) {
            error_log("Error in createSupplier: " . $e->getMessage());
            return false;
        }
    }

    public function updateSupplier($data) {
        echo json_encode(['success' => $this->supplier->updateSupplier($data)]);
    }

    public function deleteSupplier($id) {
        echo json_encode(['success' => $this->supplier->deleteSupplier($id)]);
    }
}
