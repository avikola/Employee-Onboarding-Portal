const { validationResult } = require("express-validator");

let employees = require("../../data/employees.json");

const Employee = require("../models/employeeModel.js");

const getAllEmployees = (req, res) => {
	res.json(employees);
};

const getEmployee = async (req, res) => {
	try {
		const employee = employees.find((emp) => emp.id === Number(req.params.id));

		if (!employee) return res.status(404).json({ msg: "Employee not found" });

		res.json(employee);
	} catch (err) {
		console.error(err.message);

		if (err.kind === "ObjectId") return res.status(404).json({ msg: "Employee not found" });

		res.status(500).send("Server error");
	}
};

// Add Employee
let id_temp = 11; // ID counter (simple alternative to automated uuid)
const addEmployee = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const newEmployee = { ...req.body, id: id_temp++ };

	employees.push(newEmployee);

	res.status(201).json(newEmployee);
};

// Update Employee
const updateEmployee = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const params_ID = Number(req.params.id);
	const { name, department, role, onboardingStatus } = req.body;

	const employeeFields = {};
	if (params_ID) employeeFields.id = params_ID;
	if (name) employeeFields.name = name;
	if (department) employeeFields.department = department;
	if (role) employeeFields.role = role;
	if (onboardingStatus) employeeFields.onboardingStatus = onboardingStatus;

	try {
		const employee = employees.find((emp) => emp.id === employeeFields.id);

		if (!employee) return res.status(404).json({ msg: "Employee not found" });

		const empIndex = employees.findIndex((emp) => emp.id === employeeFields.id);

		employees[empIndex] = employeeFields;

		res.json(employeeFields);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") return res.status(404).json({ msg: "Employee not found" });
		res.status(500).send("Server error");
	}
};

// Delete Employee
const deleteEmployee = async (req, res) => {
	try {
		const ID = Number(req.params.id);

		const employee = employees.find((emp) => emp.id === ID);

		if (!employee) return res.status(404).json({ msg: "Employee not found" });

		const arrayAfterDeletion = employees.filter((emp) => emp.id !== ID);

		employees = arrayAfterDeletion;

		res.json({ msg: "Employee removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") return res.status(404).json({ msg: "Employee not found" });
		res.status(500).send("Server error");
	}
};

module.exports = {
	getAllEmployees,
	getEmployee,
	addEmployee,
	updateEmployee,
	deleteEmployee,
};
