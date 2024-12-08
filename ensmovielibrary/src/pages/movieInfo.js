import React, { useEffect, useState } from "react";

const MovieInfo = () => {
    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const movieId = new URLSearchParams(window.location.search).get("id");

    useEffect(() => {
        fetch(`http://localhost/fetch_movie_info.php?id=${movieId}`, { credentials: "include" })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setMovie(data.movie);
                    setComments(data.comments);
                    setAverageRating(data.average_rating);
                } else {
                    setErrorMessage(data.error || "Failed to fetch movie details.");
                }
            })
            .catch(() => setErrorMessage("An error occurred while fetching movie details."));
    }, [movieId]);

    const handleCommentSubmit = () => {
        fetch("http://localhost/add_comment_and_rating.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ movie_id: movieId, comment: newComment, rating: newRating }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setComments((prev) => [
                        { username: "You", comment_text: newComment, timestamp: new Date().toISOString() },
                        ...prev,
                    ]);
                    setAverageRating(data.new_average_rating);
                    setNewComment("");
                    setNewRating(0);
                } else {
                    alert(data.error);
                }
            });
    };

    const handlePlayMovie = () => {
        if (movie && movie.movie_url) {
            console.log("Navigating to:", movie.movie_url); // Debugging log
            window.location.href = movie.movie_url; // Direct navigation to URL
        } else {
            alert("Movie URL is not available!");
        }
    };

    if (errorMessage) {
        return <div className="error-message">{errorMessage}</div>;
    }

    if (!movie) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="movie-info-container">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-content">
                {/* Movie Description and Play Button */}
                <div className="movie-description">
                    <h3>Description</h3>
                    <p>{movie.description}</p>
                    <button onClick={handlePlayMovie} className="play-movie-button">
                        Play Movie
                    </button>
                </div>

                {/* Average Rating and Comment Form */}
                <div className="movie-details">
                    <h3>Average Rating</h3>
                    <p>{averageRating || "No ratings yet"}</p>

                    <h3>Leave a Comment:</h3>
                    <div className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                            className="comment-textarea"
                        />
                        <div className="rating-section">
                            <label htmlFor="rating-input">Add a rating (1-5):</label>
                            <input
                                type="number"
                                id="rating-input"
                                max={5}
                                min={1}
                                value={newRating}
                                onChange={(e) => setNewRating(e.target.value)}
                                placeholder="Rating (1-5)"
                                className="rating-input"
                            />
                        </div>
                        <button onClick={handleCommentSubmit} className="submit-button">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <h3 className="comments-title">Comments:</h3>
            <div className="comments-section">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="comment-item">
                            <p>
                                <strong>{comment.username}:</strong> {comment.comment_text}
                            </p>
                            <p className="comment-timestamp">
                                {new Date(comment.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default MovieInfo;
