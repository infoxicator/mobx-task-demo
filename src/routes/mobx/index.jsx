import TaskList from './TaskList'
import TaskStats from './TaskStats'
import TaskForm from './TaskForm'

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
