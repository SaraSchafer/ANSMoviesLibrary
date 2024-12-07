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
    echo json_encode(["error" => "You must be logged in to update billing information."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Extract and validate input data
$address = $data['address'] ?? null;
$city = $data['city'] ?? null;
$state = $data['state'] ?? null;
$zipcode = $data['zipcode'] ?? null;
$card_number = $data['card_number'] ?? null;
$expiration_date = $data['expiration_date'] ?? null;
$cvv = $data['cvv'] ?? null;

if (!$address || !$city || !$state || !$zipcode || !$card_number || !$expiration_date || !$cvv) {
    echo json_encode(["error" => "All fields are required."]);
    exit;
}

try {
    // Insert or update the billing information
    $stmt = $conn->prepare(
        "INSERT INTO billing_info (user_id, address, city, state, zipcode, card_number, expiration_date, cvv) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         address = VALUES(address), 
         city = VALUES(city), 
         state = VALUES(state), 
         zipcode = VALUES(zipcode), 
         card_number = VALUES(card_number), 
         expiration_date = VALUES(expiration_date), 
         cvv = VALUES(cvv)"
    );
    $stmt->bind_param(
        "isssssss",
        $user_id, $address, $city, $state, $zipcode, $card_number, $expiration_date, $cvv
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => "Billing information updated successfully."]);
    } else {
        throw new Exception("Failed to update billing information.");
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
