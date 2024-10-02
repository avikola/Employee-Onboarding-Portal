import axios from "axios";

const apiUrl = "http://localhost:5000/api/employees";

const getAllEmployeesAPI = async () => {
	const url = `${apiUrl}`;

	const { data } = await axios.get(url.toString());

	return data;
};

const getEmployeeAPI = async (employeeId) => {
	const url = `${apiUrl}/${employeeId}`;

	const { data } = await axios.get(url.toString());

	return data;
};

const updateEmployeeAPI = async ({ employeeId, body }) => {
	const url = `${apiUrl}/${employeeId}`;

	const { data } = await axios.put(url.toString(), body);

	return data;
};

const addEmployeeAPI = async ({ body }) => {
	const url = `${apiUrl}`;

	const { data } = await axios.post(url.toString(), body);

	return data;
};

const deleteEmployeeAPI = async ({ employeeId }) => {
	const url = `${apiUrl}/${employeeId}`;

	const { data } = await axios.delete(url.toString());

	return data;
};

export { getAllEmployeesAPI, getEmployeeAPI, updateEmployeeAPI, addEmployeeAPI, deleteEmployeeAPI };
