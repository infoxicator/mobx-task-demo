import React from 'react';
import { useAtom } from 'jotai';

const TaskItem = ({ taskAtom, remove }) => {
  const [task, setTask] = useAtom(taskAtom);

  const toggleTask = () => {
    setTask(task => ({ ...task, completed: !task.completed }));
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleTask}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-date">
        {new Date(task.createdAt).toLocaleTimeString()}
      </span>
      <button 
        onClick={remove}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

TaskItem.displayName = 'TaskItem'
// export default React.memo(TaskItem) 
export default TaskItem;