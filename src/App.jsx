import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Task Manager Mobx</h1>
      <TaskForm />
      <div className="content">
        <TaskList />
        <TaskStats />
      </div>
    </div>
  )
}

export default App
