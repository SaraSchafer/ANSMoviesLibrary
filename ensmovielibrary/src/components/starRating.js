import React, { useState } from "react";

const StarRating = ({
	totalStars = 5,
	isUserRating = true,
	averageRating = 0,
}) => {
	const [rating, setRating] = useState(0);

	const handleClick = (index) => {
		setRating(index + 1);
	};

	return (
		<div
			style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
			<span style={{ marginRight: "10px" }}>Rating:</span>
			{isUserRating
				? [...Array(totalStars)].map((_, index) => (
						<Star
							key={index}
							filled={index < rating}
							onClick={() => handleClick(index)}
						/>
				  ))
				: overallRating(averageRating, totalStars)}
		</div>
	);
};

const Star = ({ filled, onClick }) => (
	<span
		onClick={onClick}
		style={{
			cursor: "pointer",
			color: filled ? "gold" : "gray",
			fontSize: "2rem",
		}}>
		★
	</span>
);

const overallRating = (rating, totalStars) => {
	return [...Array(totalStars)].map((_, index) => (
		<span
			key={index}
			style={{
				cursor: "pointer",
				color: index < rating ? "gold" : "gray",
				fontSize: "2rem",
			}}>
			★
		</span>
	));
};

export default StarRating;
