import { observer } from 'mobx-react-lite'
import { store } from '../../stores/TaskStoreMobx'

const TaskItem = observer(({ task }) => {
  console.log(`TaskItem ${task.id} rendered`)

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => store.toggleTask(task.id)}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-date">
        {new Date(task.createdAt).toLocaleTimeString()}
      </span>
      <button 
        onClick={() => store.deleteTask(task.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  )
})

TaskItem.displayName = 'TaskItem'
export default TaskItem
