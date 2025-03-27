import { memo, useState } from 'react'
import { store } from '../stores/TaskStore'

const TaskForm = memo(() => {
  const [title, setTitle] = useState('')
  
  console.log('TaskForm rendered')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      store.addTask(title.trim())
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
})

TaskForm.displayName = 'TaskForm'
export default TaskForm
