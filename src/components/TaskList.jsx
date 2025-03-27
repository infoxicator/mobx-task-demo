import { observer } from 'mobx-react-lite'
import TaskItem from './TaskItem'
import { store } from '../stores/TaskStore'

const TaskList = observer(() => {
  console.log('TaskList rendered')

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {store.tasks.length === 0 ? (
        <p>No tasks yet. Add some!</p>
      ) : (
        store.tasks.map(task => (
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
