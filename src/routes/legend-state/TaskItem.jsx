import { legendStore } from '../../stores/TaskStoreLegendState'

const TaskItem = ({ task }) => {
  const completed = Boolean(task.completed)

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => legendStore.toggleTask(task.id)}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-date">
        {new Date(task.createdAt).toLocaleTimeString()}
      </span>
      <button onClick={() => legendStore.deleteTask(task.id)} className="delete-btn">
        Delete
      </button>
    </div>
  )
}

export default TaskItem
