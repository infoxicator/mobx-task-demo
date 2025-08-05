import React from 'react';
import { TaskProvider } from './TaskContext';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import TaskForm from './TaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Task Manager Context API</h1>
        <TaskForm />
        <div className="content">
          <TaskList />
          <TaskStats />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App; 