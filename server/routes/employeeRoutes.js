const express = require("express");
const { check } = require("express-validator");

const {
	getAllEmployees,
	getEmployee,
	addEmployee,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

// router.use(auth);
// router.use(role(["HR"]));

// Get All Employees - GET /api/employees
router.get("/", getAllEmployees);

// Get Single Employee - GET /api/employees/:id
router.get("/:id", getEmployee);

// Add Employees - POST /api/employees/add
router.post(
	"/",
	[
		check("name", "Name is required").notEmpty(),
		check("role", "Role is required").notEmpty(),
		check("email", "Email is required").notEmpty().isEmail(),
		check("department", "Department is required").notEmpty(),
		check("onboardingStatus")
			.default("Pending")
			.optional()
			.isIn(["Pending", "In Progress", "Completed"]),
	],
	addEmployee
);

// Update Employee - PUT /api/employees/:id
router.put(
	"/:id",
	[
		check("name", "Name is required").notEmpty(),
		check("role", "Role is required").notEmpty(),
		check("email", "Email is required").notEmpty().isEmail(),
		check("department", "Department is required").notEmpty(),
		check("onboardingStatus")
			.default("Pending")
			.optional()
			.isIn(["Pending", "In Progress", "Completed"]),
	],
	updateEmployee
);

// Get Single Employee - DELETE /api/employees/:id
router.delete("/:id", deleteEmployee);

module.exports = router;
