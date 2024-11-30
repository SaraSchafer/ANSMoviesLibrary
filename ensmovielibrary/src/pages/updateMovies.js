import React, { useState, useEffect } from "react";
import "../styles/updateMovies.css"; // Import external CSS

const UpdateMovies = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [price, setPrice] = useState("");
    const [movieUrl, setMovieUrl] = useState(""); // State for the movie UR
    const [categories, setCategories] = useState([]);
     const [selectedCategory, setSelectedCategory] = useState("");
    const [message, setMessage] = useState("");

    // Fetch categories from the backend on component mount
    useEffect(() => {
        fetch("fetch_categories.php")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCategories(data.categories);
                } else {
                    setMessage("Failed to load categories.");
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setMessage("Error fetching categories.");
            });
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !price || selectedCategory === "") {
            setMessage("Please fill out all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("movie_url", movieUrl);        
        formData.append("release_date", releaseDate);
        formData.append("price", price);
       
        formData.append("category", selectedCategory);

        try {
            const response = await fetch("upload_movies.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setMessage("Movie uploaded successfully!");
                setTitle("");
                setDescription("");
                setMovieUrl("");
                setReleaseDate("");
                setPrice("");
                
                setSelectedCategory("");
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error uploading movie:", error);
            setMessage("An error occurred while uploading the movie.");
        }
    };

   

   const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value); // Update the single selected category
    };

    return (
        <div className="container">
            <h1 className="header">Update Movies</h1>
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="title" className="label">Movie Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter movie title"
                    required
                    className="input"
                />

                <label htmlFor="description" className="label">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter movie description"
                    rows="4"
                    className="textarea"
                ></textarea>

                <label htmlFor="release_date" className="label">Release Date</label>
                <input
                    type="date"
                    id="release_date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="input"
                />

                <label htmlFor="price" className="label">Price ($)</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    step="0.01"
                    required
                    className="input"
                />
                
                <label htmlFor="movie_url" className="label">Movie URL</label>
                <input
                    type="url"
                    id="movie_url"
                    value={movieUrl}
                    onChange={(e) => setMovieUrl(e.target.value)}
                    placeholder="Enter movie URL"
                    required
                    className="input"
                />

                <label htmlFor="categories" className="label">Categories</label>
                <select
                    id="categories"
                    name="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="select"
                >
                 <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="button">Upload Movie</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UpdateMovies;
