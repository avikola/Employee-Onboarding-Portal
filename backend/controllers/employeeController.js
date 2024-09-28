const employees = require("../data/employees.json");

const getAllEmployees = (req, res) => {
  res.json(employees);
};

const addEmployee = (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

module.exports = {
  getAllEmployees,
  addEmployee
};
