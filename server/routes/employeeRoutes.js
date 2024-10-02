const express = require("express");

const {
	getAllEmployees,
	getEmployee,
	addEmployee,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employeeController");

const { check } = require("express-validator");

const employees = require("../../data/employees.json");

const router = express.Router();

// router.use(auth);
// router.use(role(["HR"]));

// Get All Employees
// GET /api/employees
router.get("/", getAllEmployees);

// Get Single Employee
// GET /api/employees/:id
router.get("/:id", getEmployee);

// Add Employees
// POST /api/employees/add
router.post(
	"/add",
	[
		check("name", "Name is required").notEmpty(),
		check("role", "Role is required").notEmpty(),
		check("department", "Department is required").notEmpty(),
		check("onboardingStatus")
			.default("Pending")
			.optional()
			.isIn(["Pending", "In Progress", "Completed"]),
	],
	addEmployee
);

// Update Employee
// PUT /api/employees/:id
router.put("/:id", updateEmployee);

// Get Single Employee
// DELETE /api/employees/:id
router.delete("/:id", deleteEmployee);

module.exports = router;
