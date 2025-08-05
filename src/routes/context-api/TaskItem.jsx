import React from 'react';
import { useTaskContext } from './TaskContext';

const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskContext();
  
  console.log(`TaskItem ${task.id} rendered`);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-date">
        {new Date(task.createdAt).toLocaleTimeString()}
      </span>
      <button 
        onClick={() => deleteTask(task.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

TaskItem.displayName = 'TaskItem';
export default TaskItem; 