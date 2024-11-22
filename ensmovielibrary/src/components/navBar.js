import React from "react";
import "../styles/NavBar.css";
import profilePicture from "../images/profilePicture.png";
import Logo from "../images/logoNo.png";

const Navbar = () => {
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
					<li>
						<a href="/updateMovies">Update Movies</a>
					</li>
					<li>
						<a href="/movieInfo">Movie Info</a>
					</li>
					<li>
						<a href="/movieScreen">Screen</a>
					</li>
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
