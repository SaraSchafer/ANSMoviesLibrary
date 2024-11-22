import React, { useState } from "react";
import "../styles/App.css";
import StarRating from "./starRating";

const CommentsSection = () => {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (comment.trim()) {
			setComments([...comments, comment]);
			setComment("");
		}
	};

	return (
		<div
			style={{
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				width: "400px", // Set a fixed width
				margin: "0 auto", // Center the div horizontally
			}}>
			<h3>Comments</h3>
			<StarRating />
			<form onSubmit={handleSubmit}>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Write a comment..."
					rows="4"
					cols="50"
					style={{ width: "100%" }}></textarea>
				<br />
				<button type="submit">Submit</button>
			</form>
			<StarRating isUserRating={false} averageRating={3} />
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{comments.map((comment, index) => (
					<p
						key={`${comment}-${index}`}
						style={{
							wordWrap: "break-word",
							overflow: "hidden",
							maxWidth: "80%", // Set a maximum width
							textAlign: "center", // Center the text
						}}>
						{comment}
					</p>
				))}
			</div>
		</div>
	);
};

export default CommentsSection;
