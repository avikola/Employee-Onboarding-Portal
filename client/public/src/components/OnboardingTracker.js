import React from "react";

const OnboardingTracker = ({ tasks }) => {
  return (
    <div>
      <h3>Onboarding Progress</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.task_id}>
            {task.task_name}: {task.task_status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnboardingTracker;
