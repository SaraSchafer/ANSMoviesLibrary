import "../styles/App.css";
import kingdomHeartsBanner from "../images/kingdomHeartsBanner.png";

const bannerDisplay = () => {
	return (
		<div>
			<h1>Welcome Home</h1>
			<img src={kingdomHeartsBanner} alt="bannerImage" id="banner" />
		</div>
	);
};

export default bannerDisplay;
