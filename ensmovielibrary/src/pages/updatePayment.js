import React, { useState } from "react";
import "../styles/payment.css";
import CardInfo from "../components/cardInfo";
import Paypal from "../components/paypal";

const UpdatePayment = () => {
    // Address details state
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    // Card details state
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    // Handle address update
    const handleAddressSubmit = async (e) => {
        e.preventDefault();

        if (!address || !city || !state || !zipcode) {
            alert("Please fill in all address fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost/updateAddress.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address, city, state, zipcode }),
                credentials: "include", // Ensure session is included
            });

            const result = await response.json();
            if (result.success) {
                alert(result.success);
            } else {
                alert(result.error || "Failed to update address information.");
            }
        } catch (error) {
            console.error("Error updating address information:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Handle card update
    const handleCardSubmit = async (e) => {
        e.preventDefault();

        if (!cardNumber || !expirationDate || !cvv) {
            alert("Please fill in all card fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost/updateCard.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cardNumber, expirationDate, cvv }),
                credentials: "include", // Ensure session is included
            });

            const result = await response.json();
            if (result.success) {
                alert(result.success);
            } else {
                alert(result.error || "Failed to update card information.");
            }
        } catch (error) {
            console.error("Error updating card information:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Billing</h1>
            <div className="paymentArea">
                <div className="column column1">
                    <form onSubmit={handleAddressSubmit}>
                        <label>Address </label>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <br />
                        <label>City </label>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <br />
                        <label>State </label>
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <br />
                        <label>Zipcode </label>
                        <input
                            type="text"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                        />
                        <br />
                        <button type="submit">Update Address</button>
                    </form>
                </div>
                <div className="column column2">
                    <form onSubmit={handleCardSubmit}>
                        <label>Card Number </label>
                        <input
                            type="text"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <br />
                        <label>Expiration Date </label>
                        <input
                            type="text"
                            placeholder="Expiration Date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                        <br />
                        <label>CVV </label>
                        <input
                            type="text"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                        <br />
                        <button type="submit">Update Card</button>
                    </form>
                    <br />
                    <Paypal></Paypal>
                </div>
            </div>
        </div>
    );
};

export default UpdatePayment;
