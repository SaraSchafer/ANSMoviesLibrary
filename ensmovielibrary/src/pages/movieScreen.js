import React from "react";
import "../styles/App.css"; // Import the same CSS for consistency

const movieScreen = () => {
	localStorage.setItem("lastMovie", "neal illistration zeus");
	localStorage.setItem(
		"lastMovieImg",
		"https://i.ytimg.com/vi/gtKNgFftV5Y/maxresdefault.jpg"
	);
	let link = "https://www.youtube.com/embed/gtKNgFftV5Y/";
	localStorage.setItem("stoppingTime", "1:00:00");
	return (
		<div className="movieScreenContainer">
			<iframe
				allowfullscreen="1"
				width="100%"
				height="100%"
				src={`${link}/?modestbranding=1&autoplay=1&controls=1&fs=1&rel=0&showinfo=0&disablekb=1`}
				title="movie-trailer"
				style={{ border: "none" }}></iframe>
		</div>
	);
};

export default movieScreen;
// src="https://www.youtube.com/embed/gtKNgFftV5Y/?controls=1"
// https://www.youtube.com/embed/gtKNgFftV5Y/
