import React from "react";
import { useUser } from "../../hooks/user";

const EmployeeView = () => {
	const { logout } = useUser();

	return (
		<div>
			<div className="title">
				<h2>Employee Onboarding Status</h2>
				<button onClick={() => logout()}>Logout</button>
			</div>
		</div>
	);
};

export default EmployeeView;
