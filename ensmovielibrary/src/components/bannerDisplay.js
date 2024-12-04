import "../styles/App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BannerDisplay = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		// if user is not logged in, no clicking
		navigate("/movieInfo");
	};

	useEffect(() => {
		// if user is not logged in, no pointer
		const bannerElement = document.getElementById("banner");
		if (bannerElement) {
			bannerElement.style.cursor = "pointer";
		}
	}, []);

	localStorage.setItem("cameFromBanner", "true");

	function bannerImage() {
		const bannerImg = localStorage.getItem("lastMovieImg");
		if (bannerImg !== null) {
			return (
				<img
					src={bannerImage()}
					alt="bannerImage"
					id="banner"
					onClick={handleClick}
				/>
			);
		}
	}

	function welcomeText() {
		if (true) {
			//if logged in
			return "Welcome Back " + localStorage.getItem("user");
		}
		return "Welcome";
	}

	return (
		<div>
			<h1>{welcomeText()}</h1>
			{bannerImage()}
		</div>
	);
};

export default BannerDisplay;
