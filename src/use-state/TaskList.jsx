import TaskItem from './TaskItem'
import { memo } from 'react'

const TaskList = memo(({ tasks, onToggle, onDelete }) => {
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add some!</p>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))
      )}
    </div>
  )
})

export default TaskList
