import axios from "axios";

const apiUrl = "http://localhost:5000/api/tasks";

// GET - Get all Tasks
const getAllTasksAPI = async () => {
	const { data } = await axios.get(apiUrl.toString());

	return data;
};

// GET - Get Employee Specific Tasks
const getEmployeeSpecificTasksAPI = async (employee_id) => {
	const url = `${apiUrl}?id=${employee_id}`;

	const { data } = await axios.get(url.toString());

	return data;
};

// GET - Get single Task
const getTasksAPI = async (taskId) => {
	const url = `${apiUrl}/${taskId}`;

	const { data } = await axios.get(url.toString());

	return data;
};

// PUT - Update Task
const updateTasksAPI = async ({ taskId, body }) => {
	const url = `${apiUrl}/${taskId}`;

	const { data } = await axios.put(url.toString(), body);

	return data;
};

// POST - Add New Task
const addTasksAPI = async ({ body }) => {
	const { data } = await axios.post(apiUrl.toString(), body);

	return data;
};

// DELETE - Delete Task
const deleteTasksAPI = async ({ taskId }) => {
	const url = `${apiUrl}/${taskId}`;

	const { data } = await axios.delete(url.toString());

	return data;
};

export {
	getAllTasksAPI,
	getEmployeeSpecificTasksAPI,
	getTasksAPI,
	updateTasksAPI,
	addTasksAPI,
	deleteTasksAPI,
};
