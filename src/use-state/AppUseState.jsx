import { useState } from 'react'
import TaskList from './TaskList'
import TaskStats from './TaskStats'
import TaskForm from './TaskForm'
import '../App.css'

function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (title) => {
    setTasks(prev => [...prev, {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    }])
  }

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  return (
    <div className="app">
      <h1>Task Manager Use State</h1>
      <TaskForm onAddTask={addTask} />
      <div className="content">
        <TaskList 
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        <TaskStats tasks={tasks} />
      </div>
    </div>
  )
}

export default App