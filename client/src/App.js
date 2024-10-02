import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import EmployeeView from "./components/EmployeeView";
import Login from "./pages/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "employee",
				element: <EmployeeView />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
