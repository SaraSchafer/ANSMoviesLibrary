<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'] ?? null;
    $release_date = $_POST['release_date'] ?? null;
    $price = $_POST['price'];
    $movie_url = $_POST['movie_url'];
    $category = $_POST['category'] ?? null; // Single category

    // Validate required fields
    if (empty($title) || empty($price) || empty($movie_url) || empty($category)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Database connection
    $conn = new mysqli('localhost', 'root', 'root', 'ens_movies');
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
        exit;
    }

    // Insert movie details into the movies table
    $stmt = $conn->prepare("INSERT INTO movies (title, description, release_date, price, movie_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('sssds', $title, $description, $release_date, $price, $movie_url);

    if ($stmt->execute()) {
        $movie_id = $stmt->insert_id;

        // Insert the movie and its category into the movie_categories table
        $cat_stmt = $conn->prepare("INSERT INTO movie_categories (movie_id, category_id) VALUES (?, ?)");
        $cat_stmt->bind_param('ii', $movie_id, $category);
        if ($cat_stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to assign category to movie.']);
        }
        $cat_stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload movie.']);
    }

    $stmt->close();
    $conn->close();
}
?>
