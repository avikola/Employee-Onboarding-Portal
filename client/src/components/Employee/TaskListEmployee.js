import React from "react";
import "../../styles/tasks.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTasksAPI } from "../../apis/tasksAPIs";

const TaskListEmployee = ({ data }) => {
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
			{data?.map((task) => (
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
				</div>
			))}
		</div>
	);
};

export default TaskListEmployee;
