const { validationResult } = require("express-validator");

let tasks = require("../../data/tasks.json");

const getAllTasks = (req, res) => {
	res.json(tasks);
};

const getTask = async (req, res) => {
	try {
		const task = tasks.find((tk) => tk.task_id === Number(req.params.id));

		if (!task) return res.status(404).json({ msg: "Task not found" });

		res.json(task);
	} catch (err) {
		console.error(err.message);

		if (err.kind === "ObjectId") return res.status(404).json({ msg: "Task not found" });

		res.status(500).send("Server error");
	}
};

// Add Task
let id_temp = 103; // ID counter (simple alternative to automated uuid)
const addTask = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const newTask = {
		status: "",
		assignee: "",
		task_description: "",
		...req.body,
		task_id: id_temp++,
	};

	tasks.push(newTask);

	res.status(201).json(newTask);
};

// Update Task
const updateTask = async (req, res) => {
	const params_ID = Number(req.params.task_id);
	const { task_name, task_description, status, assignee } = req.body;

	const taskFields = {};
	if (params_ID) taskFields.task_id = params_ID;
	if (task_name) taskFields.task_name = task_name;
	if (task_description) taskFields.task_description = task_description;
	if (status) taskFields.status = status;
	if (assignee) taskFields.assignee = assignee;

	try {
		const task = tasks.find((tsk) => tsk.task_id === params_ID);

		if (!task) return res.status(404).json({ msg: "Task not found" });

		const taskIndex = tasks.findIndex((tsk) => tsk.task_id === taskFields.task_id);

		tasks[taskIndex] = taskFields;

		res.json(taskFields);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") return res.status(404).json({ msg: "Task not found" });
		res.status(500).send("Server error");
	}
};

module.exports = {
	getAllTasks,
	getTask,
	addTask,
	updateTask,
};
