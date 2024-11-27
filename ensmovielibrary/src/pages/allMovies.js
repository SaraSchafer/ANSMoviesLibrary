import React from "react";
import barbie from "../images/barbie.png";
import image1 from "../images/tempPic1.png";
import image2 from "../images/tempPic2.png";
import image3 from "../images/tempPic3.png";
import image4 from "../images/tempPic4.jpg";
import "../styles/App.css";
import DropDownMenu from "../components/dropDownMenu";

const AllMovies = () => {
	const imagesPerRow = 8;
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

	// I want the images to be displayed in a grid of 8 images per row
	const movies = [];

	for (let i = 0; i < imageSources.length; i += imagesPerRow) {
		const row = imageSources.slice(i, i + imagesPerRow).map((src, j) => (
			<a href="/movieInfo" key={i + j}>
				<img src={src} alt={`movie${i + j}`} />
			</a>
		));

		movies.push(
			<div key={i} className="movie-container">
				{row}
			</div>
		);
	}

	return (
		<div>
			<h1>Movies</h1>
			<br></br>
			<DropDownMenu />
			<br></br>
			{movies}
		</div>
	);
};

export default AllMovies;
