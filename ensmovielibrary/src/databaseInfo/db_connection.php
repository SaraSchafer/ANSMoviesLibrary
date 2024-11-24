<?php
$host = "localhost";
$dbname = "ens_movie_library";
$username = "root";
$password = "";

// Create a new MySQLi connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
