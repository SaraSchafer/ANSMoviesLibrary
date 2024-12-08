import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle user login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Include session cookie
            });

            const result = await response.json();
            if (result.error) {
                alert(result.error);
            } else {
                alert(result.success);
                navigate("/home"); // Redirect to home page
                window.location.reload();
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred while trying to log in. Please try again.");
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost/logout.php", {
                method: "POST",
                credentials: "include", // Include session cookie
                headers: {
                    "Content-Type": "application/json", // Ensure proper headers
                },
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert(result.success);
                    navigate("/login"); // Redirect to login page
                    window.location.reload();
                } else {
                    alert(result.error || "Logout failed");
                }
            } else {
                alert("Logout failed: HTTP " + response.status);
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <div className="App">
            <div className="login-page">
                <h1 className="login-heading">Welcome Back!</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>
                <p className="signup-prompt">
                    Don’t have an account? <Link to="/signup">Sign up</Link>
                </p>
                <button className="logout-button" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Login;
