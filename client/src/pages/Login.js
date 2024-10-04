import React, { useState } from "react";

import "../styles/login.css";

import { useUser } from "../hooks/user";

import { loginAPI } from "../apis/auth";

const Login = () => {
	const { login } = useUser();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!username || !password) return;

		try {
			const { data } = await loginAPI({
				username,
				password,
			});

			// Set Global State for RBAC control
			if (data?.msg === "success") {
				login(username, data.role);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="login-container">
			<h1>Employee Portal</h1>

			<form onSubmit={handleSubmit} className="login-form">
				<h2>Login</h2>

				<label>
					Username
					<input
						name="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>

				<label>
					Password
					<input
						name="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>

				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
