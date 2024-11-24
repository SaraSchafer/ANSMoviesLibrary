<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$host = "localhost";
$dbname = "ens_movie_library";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Read and decode JSON input
$data = file_get_contents("php://input");
if (!$data) {
    echo json_encode(["error" => "No input data received"]);
    exit;
}

$decodedData = json_decode($data, true);
if (!$decodedData) {
    echo json_encode(["error" => "Malformed JSON: " . json_last_error_msg()]);
    exit;
}

// Extract and validate fields
$email = $decodedData['email'] ?? null;
$username = $decodedData['username'] ?? null;
$password = $decodedData['password'] ?? null;

if (!$email || !$username || !$password) {
    echo json_encode(["error" => "Missing required fields", "fields" => compact('email', 'username', 'password')]);
    exit;
}

// Hash password
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Check for duplicate email or username
$query = $conn->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
$query->bind_param("ss", $email, $username);
$query->execute();
$result = $query->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["error" => "Email or username already exists"]);
} else {
    // Insert user into database
    $stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $username, $passwordHash);

    if ($stmt->execute()) {
        echo json_encode(["success" => "Account created successfully"]);
    } else {
        echo json_encode(["error" => "Failed to create account"]);
    }

    $stmt->close();
}

$conn->close();
?>
