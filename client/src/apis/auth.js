import axios from "axios";

const apiUrl = "http://localhost:5000/api/auth";

const loginAPI = async (bodyData) => {
	const url = `${apiUrl}/login`;

	const { data } = await axios.post(url.toString(), bodyData);

	return data;
};

const registerAPI = async (bodyData) => {
	const url = `${apiUrl}/login`;

	const { data } = await axios.post(url.toString(), bodyData);

	return data;
};

export { loginAPI };
