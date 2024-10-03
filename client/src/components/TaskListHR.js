import React, { useState } from "react";
import "../styles/tasks.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTasksAPI, updateTasksAPI } from "../apis/tasksAPIs";

const TaskListHR = ({ data, employees }) => {
	// Access the client
	const queryClient = useQueryClient();

	// Update Task
	const { mutate: updateTaskMutate } = useMutation({
		mutationFn: updateTasksAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllTasksAPI"] });
		},
		onError: (error) => {
			console.error("Error while updating Task:", error);
		},
	});

	const updateTaskStatusFunction = (task, event) =>
		updateTaskMutate({ taskId: task.task_id, body: { ...task, status: event.target.value } });

	const updateTaskAssigneeFunction = (task, event) =>
		updateTaskMutate({ taskId: task.task_id, body: { ...task, assignee: event.target.value } });

	return (
		<div className="task-list">
			{data.map((task) => (
				<div className="task list" key={task.task_id}>
					<span className="task-name">{task.task_name}</span>
					<span className="task-desc">{task.task_description}</span>

					<label>
						Status
						<select
							defaultValue={task.status}
							onChange={(e) => updateTaskStatusFunction(task, e)}
						>
							<option value="Pending">Pending</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
						</select>
					</label>

					<label>
						Assignee
						<select
							defaultValue={task.assignee || ""}
							onChange={(e) => updateTaskAssigneeFunction(task, e)}
						>
							<option label=""></option>
							{employees?.map((employee) => (
								<option key={employee.id} value={employee.id}>
									{employee.name}
								</option>
							))}
						</select>
					</label>
				</div>
			))}
		</div>
	);
};

export default TaskListHR;

export const AddNewTask = ({ employees, setAddNewTask }) => {
	// Access the client
	const queryClient = useQueryClient();

	const [newTaskInfo, setNewTaskInfo] = useState();

	// Add Task
	const { mutate: addTaskMutate } = useMutation({
		mutationFn: addTasksAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllTasksAPI"] });
			setAddNewTask(false);
		},
		onError: (error) => {
			console.error("Error while adding Task:", error);
		},
	});

	const addTaskFunction = () => {
		addTaskMutate({ body: newTaskInfo });
	};

	return (
		<div className="task new">
			<h4>Create Task</h4>

			<label>
				Name
				<input
					name="task_name"
					type="text"
					onChange={(e) => setNewTaskInfo({ ...newTaskInfo, task_name: e.target.value })}
				/>
			</label>

			<label>
				Description
				<input
					name="task_description"
					onChange={(e) =>
						setNewTaskInfo({ ...newTaskInfo, task_description: e.target.value })
					}
				/>
			</label>

			<label>
				Status
				<select
					defaultValue="Pending"
					onChange={(e) => setNewTaskInfo({ ...newTaskInfo, status: e.target.value })}
				>
					<option value="Pending">Pending</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
			</label>

			<label>
				Assignee
				<select
					defaultValue={""}
					onChange={(e) => setNewTaskInfo({ ...newTaskInfo, assignee: e.target.value })}
				>
					<option label=""></option>
					{employees?.map((employee) => (
						<option key={employee.id} value={employee.id}>
							{employee.name}
						</option>
					))}
				</select>
			</label>

			<div className="buttons">
				<button className="red" onClick={() => setAddNewTask(false)}>
					Cancel
				</button>
				<button onClick={() => addTaskFunction()}>Create Task</button>
			</div>
		</div>
	);
};
