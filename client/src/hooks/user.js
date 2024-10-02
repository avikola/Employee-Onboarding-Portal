import React from "react";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = React.useState(undefined);

	const login = (username, role) => {
		localStorage.setItem("username", username);
		localStorage.setItem("role", role);
		setUser({ username, role });
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
	};

	const values = React.useMemo(() => ({ ...user, login, logout }), [user]);

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = React.useContext(UserContext);

	if (context === undefined)
		throw new Error("`useUser` hook must be used within a `UserProvider` component");

	return context;
};
