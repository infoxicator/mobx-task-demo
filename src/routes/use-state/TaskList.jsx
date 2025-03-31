import TaskItem from './TaskItem'
import { memo } from 'react'
import SearchForm from './SearchForm'

const TaskList = memo(({ tasks, onToggle, onDelete, searchQuery, setSearchQuery }) => {
  return (
    <div className="task-list">
      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
