import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { registerAPI } from "../apis/auth";

const Register = () => {
	const navigate = useNavigate();

	const [bodyInfo, setBodyInfo] = useState({
		username: "",
		password: "",
		name: "",
		email: "",
		role: "Employee",
		department: "",
		dept_role: "",
	});

	const [error, setError] = useState();

	// Register
	const { mutate: registerMutate } = useMutation({
		mutationFn: registerAPI,
		onSuccess: () => {
			navigate("/");
		},
		onError: (error) => {
			console.error("Error while Registering:", error);
			const errormsg = error?.response?.data?.errors?.[0] ||
				error?.response?.data || { msg: "Error" };

			setError(errormsg);
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		registerMutate({ bodyData: bodyInfo });
	};

	return (
		<div className="login-container">
			<h1>Employee Portal</h1>

			<form onSubmit={handleSubmit} className="login-form">
				<h2>Register</h2>

				<label>
					Username*
					<input
						name="username"
						type="text"
						value={bodyInfo.username}
						onChange={(e) => setBodyInfo({ ...bodyInfo, username: e.target.value })}
						required
					/>
				</label>

				<label>
					Password*
					<input
						name="password"
						type="password"
						value={bodyInfo.password}
						onChange={(e) => setBodyInfo({ ...bodyInfo, password: e.target.value })}
						required
					/>
				</label>

				<label>
					Name*
					<input
						name="name"
						type="text"
						value={bodyInfo.name}
						onChange={(e) => setBodyInfo({ ...bodyInfo, name: e.target.value })}
						required
					/>
				</label>

				<label>
					Email*
					<input
						name="email"
						type="email"
						value={bodyInfo.email}
						onChange={(e) => setBodyInfo({ ...bodyInfo, email: e.target.value })}
						required
					/>
				</label>

				<label>
					Role*
					<select
						name="role"
						value={bodyInfo.role || "Employee"}
						onChange={(e) => setBodyInfo({ ...bodyInfo, role: e.target.value })}
						required
					>
						<option value="Employee">Employee</option>
						<option value="HR Manager">HR Manager</option>
					</select>
				</label>

				<label>
					Role in Department*
					<input
						name="dept_role"
						value={bodyInfo.dept_role}
						onChange={(e) => setBodyInfo({ ...bodyInfo, dept_role: e.target.value })}
						required
					/>
				</label>

				<label>
					Department*
					<input
						name="department"
						value={bodyInfo.department}
						onChange={(e) => setBodyInfo({ ...bodyInfo, department: e.target.value })}
						required
					/>
				</label>

				{error && <span className="error">{error.msg}</span>}

				<button type="submit">Register</button>

				<button className="simple" onClick={() => navigate("/")}>
					Return to Login
				</button>
			</form>
		</div>
	);
};

export default Register;
