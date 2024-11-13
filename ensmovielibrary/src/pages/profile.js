import React, { useState } from "react";
import "../styles/App.css";
import profilePicture from "../images/profilePicture.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [retypeNewPassword, setRetypeNewPassword] = useState("");
	const user = "John Doe";
	const navigate = useNavigate();

	return (
		<div>
			<h1>Profile</h1>
			<div className="profileBox">
				<div className="profileContent">
					<img
						src={profilePicture}
						alt="PP"
						id="profileImg"
						className="profile-picture column column1"
					/>
					<div className="column column2">
						<h2>Username: {user}</h2>
						<div className="profilePassword">
							<label htmlFor="currentPassword">Current Password:</label>
							<input
								type="password"
								id="currentPassword"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								required
							/>
						</div>
						<div className="profilePassword">
							<label htmlFor="newPassword">New Password:</label>
							<input
								type="password"
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						<div className="profilePassword">
							<label htmlFor="retypeNewPassword">Retype New Password:</label>
							<input
								type="password"
								id="retypeNewPassword"
								value={retypeNewPassword}
								onChange={(e) => setRetypeNewPassword(e.target.value)}
								required
							/>
						</div>

						<button
							className="profileButton"
							onClick={() => {
								if (newPassword === retypeNewPassword) {
									alert("Password changed successfully");
								} else {
									alert("Passwords do not match");
								}
							}}>
							Change Password
						</button>
						<br></br>
						<button
							className="profileButton"
							onClick={() => {
								navigate("/updatePayment");
							}}>
							Update Card
						</button>
						<br></br>
						<button
							className="profileButton"
							onClick={() => {
								alert("Minecrafting");
							}}>
							Change Profile Picture
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
