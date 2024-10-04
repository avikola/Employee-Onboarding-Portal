import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useUser } from "../../hooks/user";

import "../../styles/employee.css";

import TaskListEmployee from "./TaskListEmployee";

import { getEmployeeAPI } from "../../apis/employeesAPIS";
import { getAllTasksAPI, getEmployeeSpecificTasksAPI } from "../../apis/tasksAPIs";

const EmployeeView = () => {
	const { id, logout } = useUser();

	// Get Employee Details
	const { isPending: isEmployeeDataPending, data: employeeData } = useQuery({
		queryKey: ["getEmployeeAPI"],
		queryFn: () => getEmployeeAPI(id),
	});

	// Get All Tasks
	const { isPending: isTasksPending, data: tasksData } = useQuery({
		queryKey: ["getAllTasksAPI"],
		queryFn: () => getEmployeeSpecificTasksAPI(id),
	});

	const totalCompleted = tasksData?.reduce(
		(acc, current) => acc + (current.status === "Completed" ? 1 : 0),
		0
	);

	return (
		<div className="employee-section">
			<div className="title">
				<h2>Employee Onboarding Status</h2>
				<button onClick={() => logout()}>Logout</button>
			</div>

			<div className="profile-section">
				<h3>Profile</h3>

				<div className="data-display">
					<span>Name</span>
					<span>{employeeData?.name || ""}</span>
				</div>

				<div className="data-display">
					<span>Email</span>
					<span>{employeeData?.email || ""}</span>
				</div>

				<div className="data-display">
					<span>Department</span>
					<span>{employeeData?.department || ""}</span>
				</div>

				<div className="data-display">
					<span>Role</span>
					<span>{employeeData?.role || ""}</span>
				</div>

				<div className="data-display">
					<span>Onboarding Status</span>
					<span>{employeeData?.onboardingStatus || ""}</span>
				</div>
			</div>

			<div className="tasks-section">
				<div className="title">
					<h3>Your Tasks</h3>

					{tasksData?.length > 0 && (
						<span
							className={
								totalCompleted === tasksData?.length
									? "completed-green"
									: "completed-red"
							}
						>
							{totalCompleted} / {tasksData?.length} Completed (
							{(totalCompleted / tasksData?.length) * 100}
							%)
						</span>
					)}
				</div>

				{tasksData?.length > 0 ? (
					<TaskListEmployee data={tasksData} />
				) : (
					<span className="error">No Assigned Tasks Found.</span>
				)}
			</div>
		</div>
	);
};

export default EmployeeView;
