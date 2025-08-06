import React from "react";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <div className="app">
      <h1>Task Manager Zustand Optimized</h1>
      <TaskForm />
      <div className="content">
        <TaskList />
        <TaskStats />
      </div>
    </div>
  );
}

export default App;
