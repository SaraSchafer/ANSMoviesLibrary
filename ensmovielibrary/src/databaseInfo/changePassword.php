<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db_connection.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "You must be logged in to change your password."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

$currentPassword = $data['currentPassword'] ?? null;
$newPassword = $data['newPassword'] ?? null;

// Validation
if (!$currentPassword || !$newPassword) {
    echo json_encode(["error" => "Both current and new passwords are required."]);
    exit;
}

// Fetch user info
$query = $conn->prepare("SELECT password FROM users WHERE id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found."]);
    exit;
}

$user = $result->fetch_assoc();
$hashedPassword = $user['password'];

// Verify current password
if (!password_verify($currentPassword, $hashedPassword)) {
    echo json_encode(["error" => "Incorrect current password."]);
    exit;
}

// Hash the new password
$newHashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

// Update password
$update = $conn->prepare("UPDATE users SET password = ?, last_password_change = NOW() WHERE id = ?");
$update->bind_param("si", $newHashedPassword, $user_id);

if ($update->execute()) {
    echo json_encode(["success" => "Password changed successfully."]);
} else {
    echo json_encode(["error" => "Failed to change password."]);
}

$query->close();
$update->close();
$conn->close();
?>
