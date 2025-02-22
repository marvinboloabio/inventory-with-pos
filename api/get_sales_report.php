<?php
require_once __DIR__ . '/../config/Database.php';
$db = (new Database())->connect();

$type = $_GET['type']; // daily, monthly, yearly

if ($type == "daily") {
    $sql = "SELECT DATE(transaction_date) AS date, SUM(total_amount) AS total_sales 
            FROM sales_tbl
            WHERE DATE(transaction_date) = CURDATE() 
            GROUP BY DATE(transaction_date)";
} elseif ($type == "monthly") {
    $sql = "SELECT MONTH(transaction_date) AS month, YEAR(transaction_date) AS year, SUM(total_amount) AS total_sales 
            FROM sales_tbl 
            WHERE MONTH(transaction_date) = MONTH(CURDATE()) 
            GROUP BY MONTH(transaction_date), YEAR(transaction_date)";
} elseif ($type == "yearly") {
    $sql = "SELECT YEAR(transaction_date) AS year, SUM(total_amount) AS total_sales 
            FROM sales_tbl 
            GROUP BY YEAR(transaction_date)";
} else {
    echo json_encode(["error" => "Invalid report type"]);
    exit;
}

$result = $db->query($sql);
$data = $result->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>
