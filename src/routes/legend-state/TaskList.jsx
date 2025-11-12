import { observer } from '@legendapp/state/react'
import { legendStore } from '../../stores/TaskStoreLegendState'
import SearchForm from './SearchForm'
import TaskItem from './TaskItem'

const TaskList = observer(() => {
  const tasks = legendStore.filteredTasks.get()

  return (
    <div className="task-list">
      <SearchForm />
      <div className="tasks">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="no-tasks">
            {legendStore.state.searchQuery.get()
              ? 'No tasks match your search'
              : 'No tasks yet'}
          </div>
        )}
      </div>
    </div>
  )
})

export default TaskList
