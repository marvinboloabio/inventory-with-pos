<?php
class Database {
    // Database connection parameters
    private $host = "localhost"; // Your database host
    private $db_name = "inventorymanagement"; // Your database name
    private $username = "root"; // Your database username
    private $password = ""; // Your database password (empty for default)
    public $conn;

    // Get the database connection
    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Enable exceptions for errors
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
