import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { tasksAtom } from '../atoms';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const setTasks = useSetAtom(tasksAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTasks(tasks => [...tasks, {
        id: Date.now(),
        title: title.trim(),
        completed: false,
        createdAt: new Date(),
      }]);
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