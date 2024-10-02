import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles/global.css";

import App from "./App";

import { UserProvider } from "./hooks/user";

// Query Client
const queryClient = new QueryClient();

queryClient.setDefaultOptions({
	queries: {
		refetchOnWindowFocus: false,
		refetchInterval: false,
		gcTime: 0,
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<QueryClientProvider client={queryClient}>
		<UserProvider>
			<App />
		</UserProvider>
	</QueryClientProvider>
);
