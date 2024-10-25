import React from "react";
import "../styles/App.css";
import kingdomHeartsBanner from "../images/kingdomHeartsBanner.png";
import barbie from "../images/barbie.png";
import { useState } from "react";
import leftArrow from "../images/leftArrow.png";
import rightArrow from "../images/rightArrow.png";
import image1 from "../images/tempPic1.png";
import image2 from "../images/tempPic2.png";
import image3 from "../images/tempPic3.png";
import image4 from "../images/tempPic4.jpg";

const Home = () => {
	const [startIndex, setStartIndex] = useState(0);
	const imagesPerPage = 8;

	const imageSources = [
		image1,
		image2,
		image3,
		image4,
		barbie,
		image1,
		image2,
		image3,
		image4,
		barbie,
		image1,
		image2,
		image3,
		image4,
		barbie,
	];

	const handlePrevClick = () => {
		setStartIndex((prevIndex) => Math.max(prevIndex - imagesPerPage, 0));
	};

	const handleNextClick = () => {
		setStartIndex((prevIndex) =>
			Math.min(prevIndex + imagesPerPage, imageSources.length - imagesPerPage)
		);
	};

	const displayVariousMovies = (areaName) => {
		const images = imageSources
			.slice(startIndex, startIndex + imagesPerPage)
			.map((src, i) => (
				<img
					src={src}
					alt={`arrayImage${startIndex + i}`}
					id="arrayImages"
					key={startIndex + i}
				/>
			));

		return (
			<div>
				<h2>{areaName}</h2>
				<img
					src={leftArrow}
					alt="Previous"
					className="arrowImage"
					style={{ float: "left" }}
					onClick={handlePrevClick}
				/>
				<div className="image-container">{images}</div>
				<img
					src={rightArrow}
					alt="Next"
					className="arrowImage"
					style={{ float: "right" }}
					onClick={handleNextClick}
				/>
			</div>
		);
	};

	return (
		<div>
			<h1>Welcome Home</h1>
			<img src={kingdomHeartsBanner} alt="bannerImage" id="banner" />
			{displayVariousMovies("All Movies")}
			{displayVariousMovies("Superhero Movies")}
			{displayVariousMovies("Horror Movies")}
			{displayVariousMovies("Animated Movies")}
			{displayVariousMovies("Family Movies")}
			{displayVariousMovies("Musical Movies")}
			{displayVariousMovies("Historical Movies")}
			{displayVariousMovies("Sports Movies")}
			<div>
				<br></br>
			</div>
		</div>
	);
};

export default Home;
