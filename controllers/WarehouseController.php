<?php
require_once __DIR__ . '/../models/Warehouse.php';

class WarehouseController {
    private $supplier;

    public function __construct() {
        $db = (new Database())->connect();
        $this->supplier = new Warehouse($db);
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
}
