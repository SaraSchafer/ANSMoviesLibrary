import React from "react";
import "../styles/App.css";
import kingdomHeartsBanner from "../images/kingdomHeartsBanner.png";
import barbie from "../images/barbie.png";
import image1 from "../images/tempPic1.png";
import image2 from "../images/tempPic2.png";
import image3 from "../images/tempPic3.png";
import image4 from "../images/tempPic4.jpg";
import MovieCategory from "../components/MovieCategory";

const Home = () => {
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

	return (
		<div>
			<h1>Welcome Home</h1>
			<img src={kingdomHeartsBanner} alt="bannerImage" id="banner" />
			<MovieCategory
				areaName="All Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Superhero Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Horror Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Animated Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Family Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Musical Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Historical Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<MovieCategory
				areaName="Sports Movies"
				imageSources={imageSources}
				imagesPerPage={imagesPerPage}
			/>
			<div>
				<br></br>
			</div>
		</div>
	);
};

export default Home;
