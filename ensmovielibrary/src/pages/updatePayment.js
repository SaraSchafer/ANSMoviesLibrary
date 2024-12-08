import React, { useState } from "react";
import "../styles/payment.css";

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
        <div className="payment-page">
            <h1 className="page-heading">Update Billing Information</h1>
            <div className="payment-area">
                <div className="form-section">
                    <h2 className="section-heading">Address Details</h2>
                    <form onSubmit={handleAddressSubmit}>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                placeholder="Enter your state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                                type="text"
                                id="zipcode"
                                placeholder="Enter your zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                            />
                        </div>
                        <button className="form-button" type="submit">
                            Update Address
                        </button>
                    </form>
                </div>
                <div className="form-section">
                    <h2 className="section-heading">Card Details</h2>
                    <form onSubmit={handleCardSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                placeholder="Enter your card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationDate">Expiration Date</label>
                            <input
                                type="text"
                                id="expirationDate"
                                placeholder="MM/YY"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                placeholder="Enter CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                        <button className="form-button" type="submit">
                            Update Card
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePayment;
