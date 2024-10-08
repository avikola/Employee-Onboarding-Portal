import axios from "axios";

const endpoint = process.env.API_URL || process.env.REACT_APP_API_URL;
const apiUrl = `${endpoint}/api/auth`;

const loginAPI = async (bodyData) => {
	const url = `${apiUrl}/login`;

	const { data } = await axios.post(url.toString(), bodyData);

	return data;
};

const registerAPI = async ({ bodyData }) => {
	const url = `${apiUrl}/register`;

	const { data } = await axios.post(url.toString(), bodyData);

	return data;
};

export { loginAPI, registerAPI };
