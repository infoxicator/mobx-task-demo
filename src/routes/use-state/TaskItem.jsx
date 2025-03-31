import { memo } from 'react'

const TaskItem = memo(({ task, onToggle, onDelete }) => {
  console.log(`TaskItem ${task.id} rendered`)

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-date">
        {task.createdAt.toLocaleTimeString()}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  )
})

export default TaskItem