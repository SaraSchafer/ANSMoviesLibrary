import React, { useState } from "react";
import "../styles/payment.css";
import CardInfo from "../components/cardInfo";
import Paypal from "../components/paypal";

const UpdatePayment = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/updatePayment.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address, city, state, zipcode }),
            });

            const result = await response.json();
            if (result.success) {
                alert(result.success);
            } else {
                alert(result.error || "Failed to update payment information.");
            }
        } catch (error) {
            console.error("Error updating payment information:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h1>Billing</h1>
            <div className="paymentArea">
                <div className="column column1">
                    <form onSubmit={handleFormSubmit}>
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
                        <button type="submit">Update</button>
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

export default UpdatePayment;
