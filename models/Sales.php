<?php
class Sales
{
    private $conn;
    private $table = 'sales_tbl';

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getPurchase()
    {
        $query = "SELECT s.sales_transaction_id,s.transaction_date,s.total_amount,s.customer_id,(p.name) AS productName ,(p.stock_quantity) AS productQuantity,p.stock_quantity,s.quantity,s.unit_price,s.total_price,s.status FROM " . $this->table . " s INNER JOIN products_tbl p ON s.product_id = p.id WHERE s.status = 'Completed'  ORDER BY s.sales_transaction_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSales($data)
    {
        $query = "INSERT INTO " . $this->table . " 
                  (user_id , transaction_date, 	total_amount, customer_id, product_id, quantity, unit_price , total_price) 
                  VALUES (:userID,:transactionDate, :totalAmount, :customer, :product, :qty, :unitPrice, :totalPrice)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updateSales($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET transaction_date = :transactionDate , total_amount = :totalAmount, customer_id = :customer, product_id = :product, quantity = :qty, unit_price = :unitPrice, total_price = :totalPrice, status = :status  WHERE sales_transaction_id = :sales_transaction_id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function getProductIdBySalesId($id)
    {
        $query = "SELECT product_id , quantity FROM sales_tbl WHERE sales_transaction_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function updateSalesCancelledStatus($data)
    {
        // Assuming you're updating fields like adjustment_type, quantity, reason
        $query = "UPDATE " . $this->table . " SET status = 'Cancelled'  WHERE sales_transaction_id = :salesID";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

}
?>