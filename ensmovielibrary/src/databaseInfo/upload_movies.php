<?php
// Set Content-Type to JSON for proper response handling on the frontend
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve input data from the POST request
    $title = $_POST['title'] ?? null;
    $description = $_POST['description'] ?? null;
    $release_date = $_POST['release_date'] ?? null;
    $price = $_POST['price'] ?? null;
    $movie_url = $_POST['movie_url'] ?? null;
    $category = $_POST['category'] ?? null; // Single category

    // Validate required fields
    if (empty($title) || empty($price) || empty($movie_url) || empty($category)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Database connection using a centralized connection file
    require 'db_connection.php';

    // Check for database connection errors
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
        exit;
    }

    // Insert movie details into the movies table
    $stmt = $conn->prepare("INSERT INTO movies (title, description, release_date, price) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement for movie insertion.']);
        exit;
    }
    $stmt->bind_param('sssd', $title, $description, $release_date, $price);

    // Execute the statement and handle the result
    if ($stmt->execute()) {
        $movie_id = $stmt->insert_id; // Get the ID of the newly inserted movie

        // Insert the movie and its category into the movie_categories table
        $cat_stmt = $conn->prepare("INSERT INTO movie_categories (movie_id, category_id) VALUES (?, ?)");
        if (!$cat_stmt) {
            echo json_encode(['success' => false, 'message' => 'Failed to prepare statement for category assignment.']);
            exit;
        }
        $cat_stmt->bind_param('ii', $movie_id, $category);

        // Execute the category assignment and respond accordingly
        if ($cat_stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Movie uploaded and category assigned successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to assign category to movie.']);
        }
        $cat_stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload movie.']);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Handle invalid request methods
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
