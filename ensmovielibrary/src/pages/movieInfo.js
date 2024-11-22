import React from "react";
import "../styles/App.css";
import CommentsSection from "../components/commentsSection";
import image from "../images/kingdomHeartsBanner.png";
import Arrow from "../images/rightArrow.png";

const MovieInfo = () => {
	return (
		<div
			style={{
				position: "relative",
				backgroundColor: "black",
				height: "100vh",
			}}>
			<div
				style={{
					backgroundImage: `url(${image})`,
					height: "100%",
					backgroundSize: "cover",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					opacity: 0.5,
					zIndex: 1,
				}}></div>
			<div className="movieInfo columnComments">
				<div className="column1Comments">
					<h2>Kingdom Hearts</h2>
					<p>
						Follow Sora, Donald Duck, and Goofy as they journey through various
						Disney and Pixar worlds, battling shadowy creatures called the
						Heartless using their Keyblade weapons, all while trying to stop a
						looming darkness threatening to consume the universe, with the main
						focus on the power of friendship and overcoming challenges alongside
						beloved Disney characters.
					</p>
					<input
						type="image"
						src={Arrow}
						name="saveForm"
						onClick={() => {
							window.location.href = "/movieScreen";
						}}
						id="saveForm"
						alt="Play"
						style={{
							width: "150px",
							height: "150px",
							backgroundColor: "white",
							borderRadius: "30%",
						}}
					/>
				</div>
				<div className="column2Comments">
					<CommentsSection />
				</div>
			</div>
		</div>
	);
};

export default MovieInfo;
