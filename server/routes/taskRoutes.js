const express = require("express");
const { check } = require("express-validator");

const { getAllTasks, addTask, getTask, updateTask } = require("../controllers/taskController");

const router = express.Router();

// Get All Tasks - GET /api/tasks
router.get("/", getAllTasks);

// Get Single Employee - GET /api/tasks/:id
router.get("/:id", getTask);

// Add Task - POST /api/tasks/add
router.post(
	"/",
	[
		check("task_name", "Task name is required").notEmpty(),
		check("task_description").optional(),
		check("status").optional().default("Pending").isIn(["Pending", "In Progress", "Completed"]),
		check("assignee").optional().isNumeric(),
	],
	addTask
);

// Update Task - PUT /api/tasks/:id
router.put(
	"/:task_id",
	[
		check("task_name", "Task name is required").notEmpty(),
		check("task_description").optional(),
		check("status").optional().default("Pending").isIn(["Pending", "In Progress", "Completed"]),
		check("assignee").optional(),
	],
	updateTask
);

// Get Single Task - DELETE /api/tasks/:id
// router.delete("/:id", deleteEmployee);

module.exports = router;
