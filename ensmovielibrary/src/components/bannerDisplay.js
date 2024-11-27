import "../styles/App.css";
import kingdomHeartsBanner from "../images/kingdomHeartsBanner.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BannerDisplay = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/movieInfo");
	};

	useEffect(() => {
		const bannerElement = document.getElementById("banner");
		if (bannerElement) {
			bannerElement.style.cursor = "pointer";
		}
	}, []);

	const bannerImg = localStorage.getItem("lastMovieImg");
	localStorage.setItem("cameFromBanner", "true");

	return (
		<div>
			<h1>Welcome Home</h1>
			<img
				src={bannerImg != null ? bannerImg : kingdomHeartsBanner}
				alt="bannerImage"
				id="banner"
				onClick={handleClick}
			/>
		</div>
	);
};

export default BannerDisplay;
