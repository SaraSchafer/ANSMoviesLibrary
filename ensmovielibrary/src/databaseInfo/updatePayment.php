<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db_connection.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "You must be logged in to update payment information."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Extract billing data
$address = $data['address'] ?? null;
$city = $data['city'] ?? null;
$state = $data['state'] ?? null;
$zipcode = $data['zipcode'] ?? null;
$card_number = $data['card_number'] ?? null;
$expiration_date = $data['expiration_date'] ?? null;
$cvv = $data['cvv'] ?? null;

// Delete previous entry for the user
$delete_stmt = $conn->prepare("DELETE FROM billing_info WHERE user_id = ?");
$delete_stmt->bind_param("i", $user_id);

if (!$delete_stmt->execute()) {
    echo json_encode(["error" => "Failed to delete old billing information."]);
    exit;
}

// Insert new billing info
$insert_stmt = $conn->prepare("INSERT INTO billing_info (user_id, address, city, state, zipcode, card_number, expiration_date, cvv) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$insert_stmt->bind_param("isssssss", $user_id, $address, $city, $state, $zipcode, $card_number, $expiration_date, $cvv);

if ($insert_stmt->execute()) {
    echo json_encode(["success" => "Billing information updated successfully."]);
} else {
    echo json_encode(["error" => "Failed to update billing information."]);
}

$delete_stmt->close();
$insert_stmt->close();
$conn->close();
?>
