import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useUser } from "./hooks/user";

import Dashboard from "./components/HR/Dashboard";
import EmployeeView from "./components/Employee/EmployeeView";
import Login from "./pages/Login";

const public_Router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
]);

const hrManager_Router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
	},
]);

const employee_Router = createBrowserRouter([
	{
		path: "/",
		element: <EmployeeView />,
	},
]);

function App() {
	const { role, login } = useUser();

	const [loading, setLoading] = useState(true);

	// Persist states on page refresh
	useEffect(() => {
		const username = localStorage.getItem("username");
		const role = localStorage.getItem("role");
		const id = localStorage.getItem("id");

		if (username && role && id) login(username, role, id);

		setLoading(false);
	}, []);

	return loading ? (
		"Loading..."
	) : (
		<RouterProvider
			router={
				role ? (role === "Employee" ? employee_Router : hrManager_Router) : public_Router
			}
		/>
	);
}

export default App;
