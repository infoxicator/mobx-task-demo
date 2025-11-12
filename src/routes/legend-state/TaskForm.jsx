import { memo, useState } from 'react'
import { legendStore } from '../../stores/TaskStoreLegendState'

const TaskForm = memo(() => {
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmed = title.trim()
    if (!trimmed) {
      return
    }

    legendStore.addTask(trimmed)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
})

TaskForm.displayName = 'LegendStateTaskForm'
export default TaskForm
