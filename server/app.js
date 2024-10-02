const express = require("express");
const cors = require("cors");

const app = express();

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
