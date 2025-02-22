<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json'); // Set the response header

require_once __DIR__ . '/../config/Database.php';

try {
    $db = (new Database())->connect();
    $from = $_GET['from'] ?? null;
    $to = $_GET['to'] ?? null;

    // Check if from and to are both provided and valid dates
    if (empty($from) && empty($to)) {
        // No date range, select all completed sales transactions
        $sql = "SELECT * FROM purchase_returns ORDER BY return_id DESC";
        $stmt = $db->prepare($sql);
        $stmt->execute();
    
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } elseif (!empty($from) && !empty($to) && validateDate($from) && validateDate($to)) {
        // Both dates are provided and valid, use the date range filter
        $sql = "SELECT * FROM purchase_returns WHERE return_date BETWEEN :dateFrom AND :dateTo ORDER BY return_id DESC";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':dateFrom', $from, PDO::PARAM_STR);
        $stmt->bindParam(':dateTo', $to, PDO::PARAM_STR);
        $stmt->execute();
    
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        // Invalid or missing date range parameters
        echo json_encode(["error" => "Invalid date range provided"]);
        exit;
    }

    echo json_encode($data); // Return JSON
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}

/**
 * Validate if the given date is in the correct format (Y-m-d).
 *
 * @param string $date
 * @return bool
 */
function validateDate($date) {
    $d = DateTime::createFromFormat('Y-m-d', $date);
    return $d && $d->format('Y-m-d') === $date;
}
?>
