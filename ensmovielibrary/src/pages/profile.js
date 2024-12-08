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
        <div className="profile-page">
            <h1 className="profile-heading">Hello, {username}!</h1>
            <p className="profile-subheading">Welcome to your personalized profile page.</p>
            <div className="profile-container">
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="profile-picture"
                    onClick={() => alert("Change Profile Picture feature coming soon!")}
                />
            <div className="form-container">
    <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="retypeNewPassword">Retype New Password</label>
        <input
            type="password"
            id="retypeNewPassword"
            value={retypeNewPassword}
            onChange={(e) => setRetypeNewPassword(e.target.value)}
            required
        />
    </div>
</div>

                <div className="action-buttons">
                    <button className="button primary" onClick={handleChangePassword}>
                        Change Password
                    </button>
                    <button
                        className="button secondary"
                        onClick={() => navigate("/updatePayment")}
                    >
                        Update Payment Method
                    </button>
                    <button
                        className="button tertiary"
                        onClick={() => alert("Feature coming soon!")}
                    >
                        Change Profile Picture
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
