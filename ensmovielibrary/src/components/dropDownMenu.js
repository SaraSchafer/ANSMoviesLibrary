import React from "react";
import "../styles/NavBar.css";
const DropDownMenu = () => {
	function myFunction() {
		document.getElementById("myDropdown").classList.toggle("show");
	}

	// Close the dropdown menu if the user clicks outside of it
	window.onclick = function (event) {
		if (!event.target.matches(".dropbtn")) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains("show")) {
					openDropdown.classList.remove("show");
				}
			}
		}
	};

	return (
		<div>
			<div class="dropdown">
				<button onClick={myFunction} className="dropbtn">
					Sort By
				</button>
				<div id="myDropdown" class="dropdown-content">
					<a
						href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUQcmljayByb2xsZWQgc29uZw%3D%3D"
						target="_blank"
						rel="noreferrer">
						All
					</a>
					<a
						href="https://www.youtube.com/watch?v=m79DGYCtYFg"
						target="_blank"
						rel="noreferrer">
						Superhero
					</a>
					<a
						href="https://www.youtube.com/shorts/YNls--XoJDg"
						target="_blank"
						rel="noreferrer">
						Horror
					</a>
					<a
						href="https://www.youtube.com/watch?v=FRR8w3w53bI&t=3s"
						target="_blank"
						rel="noreferrer">
						Animated
					</a>
					<a
						href="https://www.youtube.com/shorts/6LRPeWhVdxc"
						target="_blank"
						rel="noreferrer">
						Family
					</a>
					<a
						href="https://www.youtube.com/watch?v=z_5Hokpu0vg"
						target="_blank"
						rel="noreferrer">
						Musical
					</a>
					<a
						href="https://www.youtube.com/watch?v=q5majAET5KA"
						target="_blank"
						rel="noreferrer">
						Historical
					</a>
					<a
						href="https://www.youtube.com/watch?v=DnxJ243fOX4"
						target="_blank"
						rel="noreferrer">
						Sports
					</a>
				</div>
			</div>
		</div>
	);
};

export default DropDownMenu;
