import React, { useEffect } from "react";
import "../styles/payment.css";

const CardInfo = () => {
	function openCard() {
		var x = document.getElementById("myCard");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	}

	// Set initial display to none
	useEffect(() => {
		var x = document.getElementById("myCard");
		if (x) {
			x.style.display = "none";
		}
	}, []);

	return (
		<div>
			<button onClick={openCard}>Card</button>

			<div id="myCard">
				<form>
					<label>Card Number </label>
					<input type="text" placeholder="Card Number" />
					<br />
					<label>Expiration Date </label>
					<input type="text" placeholder="Expiration Date" />
					<br />
					<label>CVV </label>
					<input type="text" placeholder="CVV" />
					<br />
					<br />
					<button>Update</button>
				</form>
			</div>
		</div>
	);
};

export default CardInfo;
