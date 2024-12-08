<?php
// Start the session
session_start();

// Include database connection
include 'db_connection.php';

// Set response headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Validate POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get form data
        $title = $_POST['title'] ?? null;
        $description = $_POST['description'] ?? null;
        $movie_url = $_POST['movie_url'] ?? null;
        $release_date = $_POST['release_date'] ?? null;
        $price = $_POST['price'] ?? null;
        $category_id = $_POST['category'] ?? null;

        // Validate required fields
        if (!$title || !$movie_url || !$price || !$category_id) {
            echo json_encode(["success" => false, "message" => "Required fields are missing."]);
            exit;
        }

        // Insert movie details into the database
        $stmt = $conn->prepare("
            INSERT INTO movies (title, description, movie_url, release_date, price, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->bind_param("ssssd", $title, $description, $movie_url, $release_date, $price);
        if ($stmt->execute()) {
            $movie_id = $stmt->insert_id;

            // Associate the movie with a category
            $categoryStmt = $conn->prepare("
                INSERT INTO movie_categories (movie_id, category_id)
                VALUES (?, ?)
            ");
            $categoryStmt->bind_param("ii", $movie_id, $category_id);
            $categoryStmt->execute();
            $categoryStmt->close();

            echo json_encode(["success" => true, "message" => "Movie uploaded successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to upload movie."]);
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
?>
