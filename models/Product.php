<?php
class Product
{
    private $conn;
    private $table = 'products_tbl';

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getProducts()
    {
        $query = "SELECT p.id,p. user_id, p.sku, p.name, c.category_name as category, s.name as supplier , 
                         b.brand_name as brand, u.uom_name as uom, p.price, p.stock_quantity, 
                         p.reorder_level,p.status
                  FROM " . $this->table . " p
                  JOIN category c ON p.category_id = c.category_id
                  JOIN suppliers s ON p.supplier_id = s.id
                  JOIN brands b ON p.brand_id = b.brand_id
                  JOIN uoms u ON p.uom_id = u.uom_id WHERE p.status = 'Active'
                  ORDER BY p.id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductsByID($salesProductID) {
        $query = "SELECT stock_quantity FROM " . $this->table . " WHERE id = :salesProductID LIMIT 1";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':salesProductID', $salesProductID, PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC); // Fetch as associative array
    }
    
    public function createProduct($data)
    {
        $query = "INSERT INTO " . $this->table . " 
                  (sku, name, user_id, category_id, supplier_id, brand_id, uom_id, price, stock_quantity, reorder_level) 
                  VALUES (:sku, :name, :user_id, :category_id, :supplier_id, :brand_id, :uom_id, :price, :stock_quantity, :reorder_level)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updateProduct($data)
    {
        $query = "UPDATE " . $this->table . " 
                  SET sku=:sku, name=:name, category_id=:category_id, supplier_id=:supplier_id, 
                      brand_id=:brand_id, uom_id=:uom_id, price=:price, stock_quantity=:stock_quantity, reorder_level=:reorder_level 
                  WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function deleteProduct($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute(['id' => $id]);
    }

    public function getProductById($id)
    {
        $query = "SELECT * FROM products_tbl WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }     

    public function updateStockQuantity($productId, $newQuantity)
    {
        $query = "UPDATE " . $this->table . " SET stock_quantity = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$newQuantity, $productId]);
    }

    public function updateSalesCancelledStatus($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET status = 'Cancelled'  WHERE id = :productID";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }
}
?>