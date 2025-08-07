import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { addTaskAtom } from '../atoms';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const addTask = useSetAtom(addTaskAtom);

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
};

TaskForm.displayName = 'TaskForm'
export default TaskForm 