import TaskList from './TaskList'
import TaskStats from './TaskStats'
import TaskForm from './TaskForm'

function LegendStateApp() {
  return (
    <div className="app">
      <h1>Task Manager Legend State</h1>
      <TaskForm />
      <div className="content">
        <TaskList />
        <TaskStats />
      </div>
    </div>
  )
}

export default LegendStateApp
