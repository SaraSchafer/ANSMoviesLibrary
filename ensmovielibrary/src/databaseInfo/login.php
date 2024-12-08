<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Required for credentials
header("Content-Type: application/json");

include 'db_connection.php'; // Use centralized database connection

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

// Query to fetch user details
$query = $conn->prepare("SELECT user_id, username, password, role FROM users WHERE email = ?");
if (!$query) {
    echo json_encode(["error" => "Error preparing query: " . $conn->error]);
    exit;
}
$query->bind_param("s", $email);
$query->execute();
$query->bind_result($userId, $username, $hashedPassword, $role);

if ($query->fetch() && password_verify($password, $hashedPassword)) {
    // Set session variables
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;
    $_SESSION['role'] = $role;

    // Include role in the response
    echo json_encode(["success" => "Login successful", "role" => $role]);
} else {
    echo json_encode(["error" => "Invalid email or password"]);
}

$query->close();
$conn->close();
?>
