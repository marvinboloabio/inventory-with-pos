<?php
require_once __DIR__ . '/../models/User.php';
class LoginController {
    private $user;

    public function __construct() {
        // Initialize the database connection
        $db = (new Database())->connect();
        $this->user = new User($db);
    }

    public function getIdByUsername($data) {
        try {
            $user = $this->user->getIdByUsername($data);

            if ($user) {
                return [
                    "success" => true,
                    "id" => $user["id"],
                    "username" => $user["username"],
                    "message" => "Login successful"
                ];
            } else {
                return [
                    "success" => false,
                    "message" => "Invalid username or password"
                ];
            }
        } catch (Exception $e) {
            return ["success" => false, "message" => "Database error"];
        }
    }
    
}
?>


