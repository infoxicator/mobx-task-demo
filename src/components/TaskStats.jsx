import { observer } from 'mobx-react-lite'
import { store } from '../stores/TaskStore'
import StatsItem from './StatsItem'

const TaskStats = observer(() => {
  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {store.stats.map(({ label, value }) => (
        <StatsItem key={label} label={label} value={value} />
      ))}
    </div>
  )
})

TaskStats.displayName = 'TaskStats'
export default TaskStats