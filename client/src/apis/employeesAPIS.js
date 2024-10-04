import axios from "axios";

const apiUrl = "http://localhost:5000/api/employees";

// GET - Get all Employees
const getAllEmployeesAPI = async () => {
	const { data } = await axios.get(apiUrl.toString());

	return data;
};

// GET - Get single Employee
const getEmployeeAPI = async (employeeId) => {
	const url = `${apiUrl}/${employeeId}`;

	const { data } = await axios.get(url.toString());

	return data;
};

// PUT - Update Employee
const updateEmployeeAPI = async ({ employeeId, body }) => {
	const url = `${apiUrl}/${employeeId}`;

	const { data } = await axios.put(url.toString(), body);

	return data;
};

// POST - Add New Employee
const addEmployeeAPI = async ({ body }) => {
	const { data } = await axios.post(apiUrl.toString(), body);

	return data;
};

// DELETE - Delete Employee
const deleteEmployeeAPI = async ({ employeeId }) => {
	const url = `${apiUrl}/${employeeId}`;

	const { data } = await axios.delete(url.toString());

	return data;
};

export { getAllEmployeesAPI, getEmployeeAPI, updateEmployeeAPI, addEmployeeAPI, deleteEmployeeAPI };
