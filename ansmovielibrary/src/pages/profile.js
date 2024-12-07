import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import profilePicture from "../images/profilePicture.png";

const Profile = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypeNewPassword, setRetypeNewPassword] = useState("");
    const [username, setUsername] = useState(""); // Store the logged-in username
    const navigate = useNavigate();

    // Validate session on page load
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("http://localhost/sessionCheck.php", {
                    method: "GET",
                    credentials: "include", // Include session cookies
                });

                const result = await response.json();
                if (result.loggedIn) {
                    setUsername(result.username); // Set the username from the session
                } else {
                    alert(result.message || "You must be logged in to access this page.");
                    navigate("/login"); // Redirect to login if not logged in
                }
            } catch (error) {
                console.error("Error checking session:", error);
                alert("An error occurred. Please try again.");
                navigate("/login"); // Redirect to login on error
            }
        };

        checkSession();
    }, [navigate]);

    const handleChangePassword = async () => {
        if (newPassword !== retypeNewPassword) {
            alert("New passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost/changePassword.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username, // Pass the username from the session
                    currentPassword,
                    newPassword,
                }),
                credentials: "include", // Include session cookies
            });

            const result = await response.json();
            if (result.error) {
                alert(result.error); // Display error from the backend
            } else {
                alert(result.success); // Display success message
                setCurrentPassword("");
                setNewPassword("");
                setRetypeNewPassword("");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="App">
            <h1 className="profile-heading">Profile</h1>
            <div className="login-page">
                <div className="profile-content">
                    <img src={profilePicture} alt="Profile" className="profile-picture" />
                    <div>
                        <h2>Username: {username}</h2>
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
                                required
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
                        <button className="login-button" onClick={handleChangePassword}>
                            Change Password
                        </button>
                        <br />
                        <button
                            className="login-button"
                            onClick={() => {
                                navigate("/updatePayment");
                            }}
                        >
                            Update Card
                        </button>
                        <br />
                        <button
                            className="login-button"
                            onClick={() => {
                                alert("Change profile picture coming soon!");
                            }}
                        >
                            Change Profile Picture
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
