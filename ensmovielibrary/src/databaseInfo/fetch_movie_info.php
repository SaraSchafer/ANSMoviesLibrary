<?php
// Start the session
session_start();

// Include database connection
include 'db_connection.php';

// Set response headers for CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check if movie ID is provided
if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "error" => "Movie ID is required."]);
    exit;
}

$movie_id = intval($_GET['id']);

try {
    // Fetch movie details
    $movieStmt = $conn->prepare("
        SELECT title, description, movie_url, image_url
        FROM movies
        WHERE movie_id = ?
    ");
    $movieStmt->bind_param("i", $movie_id);
    $movieStmt->execute();
    $movieResult = $movieStmt->get_result();

    if ($movieResult->num_rows > 0) {
        $movie = $movieResult->fetch_assoc();

        // Fetch comments for the movie
        $commentsStmt = $conn->prepare("
            SELECT u.username, c.comment_text, c.timestamp
            FROM comments c
            JOIN users u ON c.user_id = u.user_id
            WHERE c.movie_id = ?
            ORDER BY c.timestamp DESC
        ");
        $commentsStmt->bind_param("i", $movie_id);
        $commentsStmt->execute();
        $commentsResult = $commentsStmt->get_result();
        $comments = [];
        while ($comment = $commentsResult->fetch_assoc()) {
            $comments[] = $comment;
        }

        // Fetch average rating for the movie
        $ratingStmt = $conn->prepare("
            SELECT AVG(rating_value) AS average_rating
            FROM ratings
            WHERE movie_id = ?
        ");
        $ratingStmt->bind_param("i", $movie_id);
        $ratingStmt->execute();
        $ratingResult = $ratingStmt->get_result();
        $rating = $ratingResult->fetch_assoc()['average_rating'];

        echo json_encode([
            "success" => true,
            "movie" => $movie,
            "comments" => $comments,
            "average_rating" => $rating ? number_format($rating, 1) : null
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Movie not found."]);
    }

    $movieStmt->close();
    $commentsStmt->close();
    $ratingStmt->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}

$conn->close();
?>
