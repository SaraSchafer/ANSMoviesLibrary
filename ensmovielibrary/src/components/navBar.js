import React from "react";
import "../styles/NavBar.css";
import Logo from "../images/logoNo.png";
import noPFP1 from "../images/IMG_0023.png";
import noPFP2 from "../images/IMG_0024.png";
import noPFP3 from "../images/IMG_0041.png";
import noPFP4 from "../images/IMG_0164.png";
import noPFP5 from "../images/IMG_0185.png";

const Navbar = () => {
	function adminLoggedIn() {
		if (localStorage.getItem("admin") === "true") {
			return (
				<div className="navbar-center">
					<ul className="nav-links">
						<li>
							<a href="/movies">Movies</a>
						</li>
						<li>
							<a href="/profile">Profile</a>
						</li>
						<li>
							<a href="/updateMovies">Update Movies</a>
						</li>
					</ul>
				</div>
			);
		}
	}

	function userLoggedIn() {
		if (localStorage.getItem("user") === "true") {
			return (
				<div className="navbar-center">
					<ul className="nav-links">
						<li>
							<a href="/movies">Movies</a>
						</li>
						<li>
							<a href="/profile">Profile</a>
						</li>
					</ul>
				</div>
			);
		}
	}

	function notLoggedIn() {
		if (localStorage.getItem("user") === null) {
			return (
				<div className="navbar-center">
					<ul className="nav-links">
						<li>
							<a href="/login">Login</a>
						</li>
					</ul>
				</div>
			);
		}
	}
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function showProfileImage() {
		if (!localStorage.getItem("user") === null) {
			let profileImage = localStorage.getItem("profilePicture");
			if (false) {
				//localStorage.getItem("profilePicture") !== null
				profileImage = noPFP1;
			}
			return (
				<div className="navbar-right">
					<a href="/profile" className="user-icon">
						<i className="fas fa-user"></i>
						<img src={profileImage} alt="PP" id="profile-container" />
					</a>
				</div>
			);
		} else {
			let backupImages = noPFP1;
			const randomNumber = getRandomNumber(1, 5);
			switch (randomNumber) {
				case 1:
					backupImages = noPFP1;
					break;
				case 2:
					backupImages = noPFP2;
					break;
				case 3:
					backupImages = noPFP3;
					break;
				case 4:
					backupImages = noPFP4;
					break;
				case 5:
					backupImages = noPFP5;
					break;
				default:
					backupImages = noPFP1;
					break;
			}
			return (
				<div className="navbar-right">
					<a href="/profile" className="user-icon">
						<i className="fas fa-user"></i>
						<img src={backupImages} alt="PP" id="profile-container" />
					</a>
				</div>
			);
		}
	}

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
						<a href="/about">About Us</a>
					</li>
					{adminLoggedIn()}
					{userLoggedIn()}
					{notLoggedIn()}
				</ul>
			</div>
			{showProfileImage()}
		</nav>
	);
};

export default Navbar;
