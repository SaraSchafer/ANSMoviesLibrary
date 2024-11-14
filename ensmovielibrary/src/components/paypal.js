import React, { useEffect } from "react";
import "../styles/payment.css";

const Paypal = () => {
	function openPaypal() {
		var x = document.getElementById("myPaypal");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	}

	// Set initial display to none
	useEffect(() => {
		var x = document.getElementById("myPaypal");
		if (x) {
			x.style.display = "none";
		}
	}, []);

	return (
		<div>
			<button onClick={openPaypal}>Paypal</button>

			<div id="myPaypal">
				<button>Paypal</button>
			</div>
		</div>
	);
};

export default Paypal;
