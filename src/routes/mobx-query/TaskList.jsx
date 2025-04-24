import { observer } from 'mobx-react-lite'
import { store } from '../../stores/TaskStoreMobxQuery'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'

const TaskList = observer(() => {
  return (
    <div className="task-list">
      <SearchForm />
      {store.tasks.isLoading ? (
        <div>Loading...</div>
      ) : store.tasks.isError ? (
        <div>Error loading tasks</div>
      ) : (
        <div className="tasks">
          {store.tasks.data.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
          {store.tasks.data.length === 0 && (
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
