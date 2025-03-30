import { observer } from 'mobx-react-lite'
import TaskItem from './TaskItem'
import { store } from '../stores/TaskStore'

const TaskList = observer(() => {
  console.log('TaskList rendered')
  const tasks = store.tasks;

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (store.isError) {
    return <div>Error: {tasks.error.message}</div>
  }
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add some!</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))
      )}
    </div>
  )
})

TaskList.displayName = 'TaskList'
export default TaskList
