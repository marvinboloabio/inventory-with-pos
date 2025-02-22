<?php
require_once __DIR__ . '/../config/Database.php';
$db = (new Database())->connect();

$type = $_GET['type']; // daily, monthly, yearly

if ($type == "Remaining") {
    $sql = "SELECT p.id, p.user_id, p.sku, p.name, c.category_name AS category, s.name AS supplier, 
                   b.brand_name AS brand, u.uom_name AS uom, p.price, p.stock_quantity, 
                   p.reorder_level, p.status
            FROM products_tbl p
            JOIN category c ON p.category_id = c.category_id
            JOIN suppliers s ON p.supplier_id = s.id
            JOIN brands b ON p.brand_id = b.brand_id
            JOIN uoms u ON p.uom_id = u.uom_id WHERE p.status = 'Active'
            ORDER BY p.id DESC";
} elseif ($type == "Out") {
    $sql = "SELECT p.id, p.user_id, p.sku, p.name, c.category_name AS category, s.name AS supplier, 
                   b.brand_name AS brand, u.uom_name AS uom, p.price, p.stock_quantity, 
                   p.reorder_level, p.status
            FROM products_tbl p
            JOIN category c ON p.category_id = c.category_id
            JOIN suppliers s ON p.supplier_id = s.id
            JOIN brands b ON p.brand_id = b.brand_id
            JOIN uoms u ON p.uom_id = u.uom_id WHERE p.status = 'Active' AND p.stock_quantity <= p.reorder_level
            ORDER BY p.id DESC";
} else {
    echo json_encode(["error" => "Invalid report type"]);
    exit;
}

$result = $db->query($sql);
$data = $result->fetchAll(PDO::FETCH_ASSOC);

// Set header for JSON response
header('Content-Type: application/json');

// Return the data as JSON
echo json_encode($data);
?>
