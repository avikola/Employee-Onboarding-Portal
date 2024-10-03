import axios from "axios";

const apiUrl = "http://localhost:5000/api/tasks";

const getAllTasksAPI = async () => {
	const url = `${apiUrl}`;

	const { data } = await axios.get(url.toString());

	return data;
};

const getTasksAPI = async (taskId) => {
	const url = `${apiUrl}/${taskId}`;

	const { data } = await axios.get(url.toString());

	return data;
};

const updateTasksAPI = async ({ taskId, body }) => {
	const url = `${apiUrl}/${taskId}`;

	const { data } = await axios.put(url.toString(), body);

	return data;
};

const addTasksAPI = async ({ body }) => {
	const url = `${apiUrl}`;

	const { data } = await axios.post(url.toString(), body);

	return data;
};

const deleteTasksAPI = async ({ taskId }) => {
	const url = `${apiUrl}/${taskId}`;

	const { data } = await axios.delete(url.toString());

	return data;
};

export { getAllTasksAPI, getTasksAPI, updateTasksAPI, addTasksAPI, deleteTasksAPI };
