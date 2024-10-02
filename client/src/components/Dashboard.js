import React, { useState } from "react";
import "../styles/dashboard.css";

import { useQuery } from "@tanstack/react-query";

import { useUser } from "../hooks/user";

import { getAllEmployeesAPI } from "../apis/employeesAPIS";

import EmployeeInfo from "./EmployeeInfo";

const Dashboard = () => {
	const { logout } = useUser();

	const { isPending, data } = useQuery({
		queryKey: ["getAllEmployeesAPI"],
		queryFn: () => getAllEmployeesAPI(),
	});

	// For Updating
	const [selectedEmployee, setSelectedEmployee] = useState();

	// Add New Employee
	const [addNewEmployee, setAddNewEmployee] = useState(false);

	return (
		<div className="hr-section">
			<div className="title">
				<h2>HR Dashboard</h2>
				<button onClick={() => logout()}>Logout</button>
			</div>
			{/* Add functionality to display employee list here */}

			<div>
				<div className="title">
					<h3>Employee Management</h3>
					<button onClick={() => setAddNewEmployee(true)}>Add New Employee</button>
				</div>

				<div className="employee-section">
					<div className="employee-list">
						{data?.map((employee) => (
							<div
								key={employee.id}
								className="employee"
								role="button"
								onClick={() => setSelectedEmployee(employee)}
							>
								{employee.name}
							</div>
						))}
					</div>

					{selectedEmployee && (
						<EmployeeInfo
							selectedEmployee={selectedEmployee}
							setSelectedEmployee={setSelectedEmployee}
						/>
					)}

					{addNewEmployee && (
						<EmployeeInfo newEmployee={true} setAddNewEmployee={setAddNewEmployee} />
					)}
				</div>
			</div>

			<div>
				<h3>Tasks</h3>
			</div>
		</div>
	);
};

export default Dashboard;
