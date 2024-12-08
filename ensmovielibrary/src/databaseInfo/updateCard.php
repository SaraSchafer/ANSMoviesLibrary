<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db_connection.php';

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "You must be logged in to update card information."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Extract and validate input data
$card_number = $data['cardNumber'] ?? null;
$expiration_date = $data['expirationDate'] ?? null;
$cvv = $data['cvv'] ?? null;

if (!$card_number || !$expiration_date || !$cvv) {
    echo json_encode(["error" => "All card fields are required."]);
    exit;
}

try {
    // Insert or update the card information
    $stmt = $conn->prepare(
        "INSERT INTO billing_info (user_id, card_number, expiration_date, cvv) 
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         card_number = VALUES(card_number), 
         expiration_date = VALUES(expiration_date), 
         cvv = VALUES(cvv)"
    );
    $stmt->bind_param("isss", $user_id, $card_number, $expiration_date, $cvv);

    if ($stmt->execute()) {
        echo json_encode(["success" => "Card information updated successfully."]);
    } else {
        throw new Exception("Failed to update card information.");
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
