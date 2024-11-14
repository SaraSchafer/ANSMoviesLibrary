import React, { useState } from "react";
import "../styles/profile.css";
import profilePicture from "../images/profilePicture.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [retypeNewPassword, setRetypeNewPassword] = useState("");
	const user = "John Doe";
	const navigate = useNavigate();

	return (
		<div className="App">
			<h1 className="profile-heading">Profile</h1>
			<div className="login-page">
				<div className="profile-content">
					<img src={profilePicture} alt="PP" className="profile-picture" />
					<div>
						<h2>Username: {user}</h2>
						<div className="form-group">
							<label htmlFor="currentPassword">Current Password:</label>
							<input
								type="password"
								id="currentPassword"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								required
								className="form-input"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="newPassword">New Password:</label>
							<input
								type="password"
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className="form-input"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="retypeNewPassword">Retype New Password:</label>
							<input
								type="password"
								id="retypeNewPassword"
								value={retypeNewPassword}
								onChange={(e) => setRetypeNewPassword(e.target.value)}
								required
								className="form-input"
							/>
						</div>

						<button
							className="login-button"
							onClick={() => {
								if (newPassword === retypeNewPassword) {
									alert("Password changed successfully");
								} else {
									alert("Passwords do not match");
								}
							}}>
							Change Password
						</button>
						<br />
						<button
							className="login-button"
							onClick={() => {
								navigate("/updatePayment");
							}}>
							Update Card
						</button>
						<br />
						<button
							className="login-button"
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
