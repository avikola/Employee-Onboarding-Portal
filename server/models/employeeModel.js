const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  department: String,
  onboardingStatus: String
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
