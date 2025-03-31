import { observer } from 'mobx-react-lite'
import { store } from '../stores/TaskStore'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'

const TaskList = observer(() => {
  return (
    <div className="task-list">
      <SearchForm />
      {store.isLoading ? (
        <div>Loading...</div>
      ) : store.isError ? (
        <div>Error loading tasks</div>
      ) : (
        <div className="tasks">
          {store.filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          {store.filteredTasks.length === 0 && (
            <div className="no-tasks">
              {store.searchQuery 
                ? 'No tasks match your search'
                : 'No tasks yet'}
            </div>
          )}
        </div>
      )}
    </div>
  )
})

export default TaskList
