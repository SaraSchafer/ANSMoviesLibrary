import React, { useState } from "react";
import "../styles/login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		alert("Logged in successfully!");
	};

	return (
		<div className="login-page">
			<h1 className="login-heading">Login</h1>
			<form onSubmit={handleLogin} className="login-form">
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
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
					/>
				</div>
				<button type="submit" className="login-button">Login</button>
			</form>
			<p className="signup-prompt">Don’t have an account? <a href="/signup">Sign up here</a>.</p>
		</div>
	);
};

export default Login;
