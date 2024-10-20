import React from "react";
import "../styles/App.css";
import kingdomHeartsBanner from "../images/kingdomHeartsBanner.png";
import barbie from "../images/barbie.png";

const Home = () => {
	function imageArray() {
		const images = [];
		for (let i = 0; i < 10; i++) {
			images.push(
				<img src={barbie} alt="arrayImage" id="arrayImages" key={i} />
			);
		}
		return images;
	}

	return (
		<div>
			<h1>Welcome Home</h1>
			<img src={kingdomHeartsBanner} alt="bannerImage" id="banner" />
			{imageArray()}
			<div>
				<br></br>
			</div>
		</div>
	);
};

export default Home;
