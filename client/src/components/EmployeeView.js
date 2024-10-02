import React from "react";
import { useUser } from "../hooks/user";

const EmployeeView = () => {
	const { logout } = useUser();

	return (
		<div>
			<div className="title">
				<h2>Employee Onboarding Status</h2>
				<button onClick={() => logout()}>Logout</button>
			</div>

			{/* Display employee's tasks here */}
		</div>
	);
};

export default EmployeeView;
