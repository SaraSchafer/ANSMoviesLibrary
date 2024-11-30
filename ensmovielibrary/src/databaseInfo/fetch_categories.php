<?php
// Prevent any output before JSON
ob_start(); // Start output buffering
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


// Clear previous output (if any) to avoid HTML wrapping
ob_clean();

try {
    $conn = new mysqli("localhost", "root", "root", "ens_movies");
    if ($conn->connect_error) {
        throw new Exception("Database connection failed.");
    }

    $query = "SELECT category_id, name FROM categories";
    $result = $conn->query($query);

    if ($result) {
        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        echo json_encode(["success" => true, "categories" => $categories]);
    } else {
        throw new Exception("Failed to fetch categories.");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

// Stop further output
exit();
