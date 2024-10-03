import React, { useState } from "react";
import "../styles/dashboard.css";

import { useQuery } from "@tanstack/react-query";

import { useUser } from "../hooks/user";

import { getAllEmployeesAPI } from "../apis/employeesAPIS";

import EmployeeInfo from "./EmployeeInfo";
import { getAllTasksAPI } from "../apis/tasksAPIs";
import TaskListHR, { AddNewTask } from "./TaskListHR";

const Dashboard = () => {
	const { logout } = useUser();

	const { isPending: isEmployeesPending, data: employeeData } = useQuery({
		queryKey: ["getAllEmployeesAPI"],
		queryFn: () => getAllEmployeesAPI(),
	});

	const { isPending: isTasksPending, data: tasksData } = useQuery({
		queryKey: ["getAllTasksAPI"],
		queryFn: () => getAllTasksAPI(),
	});

	// For Updating
	const [selectedEmployee, setSelectedEmployee] = useState();

	// Add New Employee
	const [addNewEmployee, setAddNewEmployee] = useState(false);

	// Add New Employee
	const [addNewTask, setAddNewTask] = useState(false);

	return (
		<div className="hr-section">
			<div className="title main">
				<h2>HR Dashboard</h2>
				<button onClick={() => logout()} className="logout">
					Logout
				</button>
			</div>

			<div className="management-block">
				<div className="title">
					<h3>Employee Management</h3>
					<button
						onClick={() => {
							setAddNewEmployee(true);
							setSelectedEmployee();
						}}
					>
						Add New Employee
					</button>
				</div>

				<div className="employee-section">
					<div className="employee-list">
						{employeeData?.map((employee) => (
							<div
								key={employee.id}
								className="employee"
								role="button"
								onClick={() => {
									setAddNewEmployee(false);
									if (selectedEmployee?.name === employee.name)
										setSelectedEmployee();
									else setSelectedEmployee(employee);
								}}
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

			<div className="tasks-block">
				<div className="title">
					<h3>Tasks</h3>
					<button onClick={() => setAddNewTask(true)}>Add New Task</button>
				</div>

				<div className="employee-section task-section">
					{tasksData && <TaskListHR data={tasksData} employees={employeeData} />}

					{addNewTask && (
						<AddNewTask employees={employeeData} setAddNewTask={setAddNewTask} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
