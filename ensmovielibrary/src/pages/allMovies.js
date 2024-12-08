import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [sortCriteria, setSortCriteria] = useState(""); // Track the selected sorting criteria
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        fetch("http://localhost/fetch_movies.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setMovies(data.movies);
                } else {
                    setErrorMessage("Failed to fetch movies.");
                }
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                setErrorMessage("An error occurred while fetching movies.");
            });
    };

    const handleSortChange = (e) => {
        const criteria = e.target.value;
        setSortCriteria(criteria);

        let sortedMovies = [...movies];
        if (criteria === "title") {
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === "release_date") {
            sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        } else if (criteria === "price") {
            sortedMovies.sort((a, b) => a.price - b.price);
        }
        setMovies(sortedMovies);
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        padding: "20px",
    };

    const cardStyle = {
        backgroundColor: "#ffd700",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        textAlign: "center",
        transition: "transform 0.2s",
        cursor: "pointer",
    };

    const imageStyle = {
        width: "100%",
        height: "auto",
        borderRadius: "5px",
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movieInfo?id=${movieId}`);
    };

    return (
        <div>
            <h1>Movies</h1>
            <br />
            {/* Single Sort Dropdown */}
            <div className="sort-container">
                <label htmlFor="sort" className="sort-label">
                    Sort by:{" "}
                </label>
                <select
                    id="sort"
                    className="sort-dropdown"
                    value={sortCriteria}
                    onChange={handleSortChange}
                >
                    <option value="">Select</option>
                    <option value="title">Title</option>
                    <option value="release_date">Release Date</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <br />
            {errorMessage && <p>{errorMessage}</p>}
            <div style={gridStyle}>
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        style={cardStyle}
                        onClick={() => handleMovieClick(movie.movie_id)}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        <img src={movie.image_url} alt={movie.title} style={imageStyle} />
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <p>Price: ${movie.price}</p>
                        <p>Release Date: {movie.release_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllMovies;
