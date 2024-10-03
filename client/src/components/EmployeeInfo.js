import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addEmployeeAPI, deleteEmployeeAPI, updateEmployeeAPI } from "../apis/employeesAPIS";

const EmployeeInfo = ({
	selectedEmployee,
	setSelectedEmployee,
	newEmployee = false,
	setAddNewEmployee,
}) => {
	// Access the client
	const queryClient = useQueryClient();

	const [error, setError] = useState();

	const [updatedInfo, setUpdatedInfo] = useState(
		selectedEmployee || { id: "", name: "", role: "", department: "", onboardingStatus: "" }
	);

	// Add Employee
	const { mutate: addEmployee } = useMutation({
		mutationFn: addEmployeeAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllEmployeesAPI"] });
			setAddNewEmployee(false);
		},
		onError: (error) => {
			console.error("Error while creating Employee:", error);
			const errormsg = error?.response?.data?.errors?.[0] || "Error";
			setError(errormsg);
		},
	});

	const addEmployeeFunction = () => addEmployee({ body: updatedInfo });

	// Update Employee
	const { mutate: updateEmployeeMutate } = useMutation({
		mutationFn: updateEmployeeAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllEmployeesAPI"] });
			setSelectedEmployee();
		},
		onError: (error) => {
			console.error("Error while updating Employee:", error);
			const errormsg = error?.response?.data?.errors?.[0] || "Error";
			setError(errormsg);
		},
	});

	const updateEmployeeFunction = () =>
		updateEmployeeMutate({ employeeId: updatedInfo.id, body: updatedInfo });

	// Delete Employee
	const { mutate: deleteEmployeeMutate } = useMutation({
		mutationFn: deleteEmployeeAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllEmployeesAPI"] });

			setSelectedEmployee();
		},
		onError: (error) => {
			console.error("Error while deleting Employee:", error);
		},
	});

	const deleteEmployeeFunction = () => deleteEmployeeMutate({ employeeId: updatedInfo.id });

	// Updates for every employee
	useEffect(() => {
		if (selectedEmployee) setUpdatedInfo(selectedEmployee);
	}, [selectedEmployee]);

	return (
		<div className="employee-edit">
			<h3>{newEmployee ? "Add New Employee" : "Employee Info"}</h3>

			<div className="employee-form">
				<label>
					Name*
					<input
						name="name"
						type="text"
						value={updatedInfo.name}
						onChange={(e) => setUpdatedInfo({ ...updatedInfo, name: e.target.value })}
					/>
				</label>

				<label>
					Role*
					<input
						name="role"
						value={updatedInfo.role}
						onChange={(e) => setUpdatedInfo({ ...updatedInfo, role: e.target.value })}
					/>
				</label>

				<label>
					Department*
					<input
						name="department"
						value={updatedInfo.department}
						onChange={(e) =>
							setUpdatedInfo({ ...updatedInfo, department: e.target.value })
						}
					/>
				</label>

				<label>
					On-boarding Status
					<input
						name="onboardingStatus"
						value={updatedInfo.onboardingStatus}
						onChange={(e) =>
							setUpdatedInfo({ ...updatedInfo, onboardingStatus: e.target.value })
						}
					/>
				</label>

				{newEmployee ? (
					<div className="buttons">
						<button onClick={() => setAddNewEmployee(false)} className="red">
							Cancel
						</button>
						<button onClick={() => addEmployeeFunction()}>Create</button>
					</div>
				) : (
					<div className="buttons">
						<button
							onClick={() => {
								deleteEmployeeFunction();
							}}
							className="red"
						>
							Delete
						</button>
						<button onClick={() => updateEmployeeFunction()}>Update</button>
					</div>
				)}

				{error && <span style={{ color: "darkred" }}>{error.msg}</span>}
			</div>
		</div>
	);
};

export default EmployeeInfo;
