<?php
session_start();
include 'db_connection.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "error" => "User not logged in."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$movie_id = intval($data['movie_id']);
$comment = $data['comment'];
$rating = intval($data['rating']);

$user_id = $_SESSION['user_id'];

try {
    // Check if the user already commented
    $checkStmt = $conn->prepare("SELECT * FROM comments WHERE user_id = ? AND movie_id = ?");
    $checkStmt->bind_param("ii", $user_id, $movie_id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        echo json_encode(["success" => false, "error" => "You have already commented on this movie."]);
        exit;
    }

    // Add comment
    $commentStmt = $conn->prepare("INSERT INTO comments (movie_id, user_id, comment_text, timestamp) VALUES (?, ?, ?, NOW())");
    $commentStmt->bind_param("iis", $movie_id, $user_id, $comment);
    $commentStmt->execute();

    // Add rating
    $ratingStmt = $conn->prepare("INSERT INTO ratings (movie_id, user_id, rating_value, timestamp) VALUES (?, ?, ?, NOW())");
    $ratingStmt->bind_param("iii", $movie_id, $user_id, $rating);
    $ratingStmt->execute();

    // Calculate new average rating
    $avgStmt = $conn->prepare("SELECT AVG(rating_value) AS average_rating FROM ratings WHERE movie_id = ?");
    $avgStmt->bind_param("i", $movie_id);
    $avgStmt->execute();
    $avgResult = $avgStmt->get_result();
    $average_rating = $avgResult->fetch_assoc()['average_rating'];

    echo json_encode(["success" => true, "new_average_rating" => number_format($average_rating, 1)]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}

$conn->close();
?>
