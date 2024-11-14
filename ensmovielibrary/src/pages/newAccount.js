import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/login.css';

const NewAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleCreateAccount = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Account created successfully!");
    };

    return (
        <div className="App">
            <h1 className="login-heading">Create New Account</h1>  {/* Use 'login-heading' for consistency */}
            <div className="login-page">  {/* Use 'login-page' to match the login page style */}
                <form onSubmit={handleCreateAccount} className="login-form">  {/* Use 'login-form' */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Re-enter Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="login-button">Sign Up</button>  {/* Use 'login-button' */}
                </form>
                <p className="signup-prompt">  {/* Use 'signup-prompt' to match the style */}
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default NewAccount;
