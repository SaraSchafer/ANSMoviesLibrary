<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Check if the session is active
if (isset($_SESSION['user_id'])) {
    session_unset(); // Unset all session variables
    session_destroy(); // Destroy the session
    echo json_encode(["success" => "Logout successful"]);
} else {
    echo json_encode(["error" => "No active session to destroy."]);
}
?>
