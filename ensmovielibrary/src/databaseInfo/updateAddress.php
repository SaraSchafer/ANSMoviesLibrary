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
    echo json_encode(["error" => "You must be logged in to update address information."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

// Extract and validate input data
$address = $data['address'] ?? null;
$city = $data['city'] ?? null;
$state = $data['state'] ?? null;
$zipcode = $data['zipcode'] ?? null;

if (!$address || !$city || !$state || !$zipcode) {
    echo json_encode(["error" => "All address fields are required."]);
    exit;
}

try {
    // Insert or update the address information
    $stmt = $conn->prepare(
        "INSERT INTO billing_info (user_id, address, city, state, zipcode) 
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
         address = VALUES(address), 
         city = VALUES(city), 
         state = VALUES(state), 
         zipcode = VALUES(zipcode)"
    );
    $stmt->bind_param("issss", $user_id, $address, $city, $state, $zipcode);

    if ($stmt->execute()) {
        echo json_encode(["success" => "Address updated successfully."]);
    } else {
        throw new Exception("Failed to update address information.");
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
