module.exports = function (roles = []) {
	// roles param can be a single role string (e.g., 'HR')
	// or an array of roles (e.g., ['HR', 'Admin'])
	if (typeof roles === "string") {
		roles = [roles];
	}

	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ msg: "Access denied: insufficient permissions" });
		}

		next();
	};
};
