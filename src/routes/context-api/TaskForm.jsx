import React, { memo, useState } from 'react';
import { useTaskContext } from './TaskContext';

const TaskForm = memo(() => {
  const [title, setTitle] = useState('');
  const { addTask } = useTaskContext();
  
  console.log('TaskForm rendered');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
});

TaskForm.displayName = 'TaskForm';
export default TaskForm; 