<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000"); // Must match your frontend URL exactly
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Required for credentials
header("Content-Type: application/json");

include 'db_connection.php';

$data = file_get_contents("php://input");
if (!$data) {
    echo json_encode(["error" => "No input data received"]);
    exit;
}

$decodedData = json_decode($data, true);
$email = $decodedData['email'] ?? null;
$password = $decodedData['password'] ?? null;

if (!$email || !$password) {
    echo json_encode(["error" => "Email and password are required"]);
    exit;
}

$query = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$query->bind_result($userId, $username, $hashedPassword);

if ($query->fetch() && password_verify($password, $hashedPassword)) {
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;

    echo json_encode(["success" => "Login successful"]);
} else {
    echo json_encode(["error" => "Invalid email or password"]);
}

$query->close();
$conn->close();
?>
