import React from "react";
import "../styles/payment.css";
import CardInfo from "../components/cardInfo";
import Paypal from "../components/paypal";

const updatePayment = () => {
	return (
		<div>
			<h1>Billing</h1>
			<div className="paymentArea">
				<div className="column column1">
					<form>
						<label>Address </label>
						<input type="text" placeholder="Address" />
						<br />
						<label>City </label>
						<input type="text" placeholder="City" />
						<br />
						<label>State </label>
						<input type="text" placeholder="State" />
						<br />
						<label>Zipcode </label>
						<input type="text" placeholder="Zipcode" />
						<br />
						<button>Update</button>
					</form>
				</div>
				<div className="column column2">
					<CardInfo></CardInfo>
					<br />
					<Paypal></Paypal>
				</div>
			</div>
		</div>
	);
};

export default updatePayment;
