import React from 'react';
import { useSetAtom } from 'jotai';
import { toggleTaskAtom, deleteTaskAtom } from '../atoms';

const TaskItem = ({ task }) => {
  const toggleTask = useSetAtom(toggleTaskAtom);
  const deleteTask = useSetAtom(deleteTaskAtom);

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

TaskItem.displayName = 'TaskItem'
export default TaskItem 