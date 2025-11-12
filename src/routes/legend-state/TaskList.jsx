import { useValue } from '@legendapp/state/react'
import { legendStore } from '../../stores/TaskStoreLegendState'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'

const TaskList = () => {
  const tasks = useValue(legendStore.filteredTasks)
  const searchQuery = useValue(legendStore.state.searchQuery)

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="no-tasks">
            {searchQuery
              ? 'No tasks match your search'
              : 'No tasks yet'}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList
