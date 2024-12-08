import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import profilePicture from "../images/profilePicture.png";
import Logo from "../images/logoNo.png";

const Navbar = () => {
	const [userRole, setUserRole] = useState(""); // To store the user role
	const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login state

	useEffect(() => {
		// Fetch user info to get role
		fetch("http://localhost/fetch_user_info.php", {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					setUserRole(data.role); // Set the role (e.g., 'admin' or 'customer')
					setIsLoggedIn(true); // User is logged in
				} else {
					setUserRole(""); // Reset role if not logged in
					setIsLoggedIn(false); // User is not logged in
				}
			})
			.catch((error) => {
				console.error("Error fetching user info:", error);
			});
	}, []);

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<img src={Logo} alt="logo" className="logoNoBackground" />
				<a href="/" className="logo">
					ENS Movie Library
				</a>
			</div>
			<div className="navbar-center">
				<ul className="nav-links">
					<li>
						<a href="/home">Home</a>
					</li>
					<li>
						<a href="/movies">Movies</a>
					</li>
					<li>
						<a href="/about">About Us</a>
					</li>
					<li>
						<a href="/profile">Profile</a>
					</li>
					<li>
						<a href="/login">Login</a>
					</li>
					{/* Conditionally render Update Movies for admin users */}
					{userRole === "admin" && (
						<li>
							<a href="/updateMovies">Update Movies</a>
						</li>
					)}
				</ul>
			</div>
			<div className="navbar-right">
				<a href="/profile" className="user-icon">
					<i className="fas fa-user"></i>
					<img src={profilePicture} alt="PP" id="profile-container" />
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
