import React, { useState } from "react";
import leftArrow from "../images/leftArrow.png";
import rightArrow from "../images/rightArrow.png";
import "../styles/App.css";
import { useNavigate } from "react-router-dom";

const MovieCategory = ({ areaName, imageSources, imagesPerPage }) => {
	const [startIndex, setStartIndex] = useState(0);
	const navigate = useNavigate();

	const handlePrevClick = () => {
		setStartIndex((prevIndex) => Math.max(prevIndex - imagesPerPage, 0));
	};

	const handleNextClick = () => {
		setStartIndex((prevIndex) =>
			Math.min(prevIndex + imagesPerPage, imageSources.length - imagesPerPage)
		);
	};

	const handleImageClick = (src) => {
		let movieClicked = src;
		// movieClicked = movieClicked.split("/").pop();
		localStorage.setItem("movieClicked", movieClicked);
		localStorage.setItem("cameFromBanner", "false");
		navigate("/movieInfo");
	};

	const images = imageSources
		.slice(startIndex, startIndex + imagesPerPage)
		.map((src, i) => (
			<img
				src={src}
				alt={`arrayImage${startIndex + i}`}
				id="arrayImages"
				key={startIndex + i}
				onClick={() => handleImageClick(src)}
				style={{ cursor: "pointer" }}
			/>
		));

	return (
		<div>
			<h2>{areaName}</h2>
			<div style={{ display: "flex", alignItems: "center" }}>
				<img
					src={leftArrow}
					alt="Previous"
					className="arrowImage"
					style={{ cursor: "pointer", marginLeft: "100px" }}
					onClick={handlePrevClick}
				/>
				<div
					className="image-container"
					style={{ flexGrow: 1, textAlign: "center" }}>
					{images}
				</div>
				<img
					src={rightArrow}
					alt="Next"
					className="arrowImage"
					style={{ cursor: "pointer", marginRight: "100px" }}
					onClick={handleNextClick}
				/>
			</div>
		</div>
	);
};

export default MovieCategory;
