import { observer } from '@legendapp/state/react'
import { legendStore } from '../../stores/TaskStoreLegendState'
import StatsItem from './StatsItem'

const TaskStats = observer(() => {
  const stats = legendStore.stats.get()

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {stats.map(({ label, value }) => (
        <StatsItem key={label} label={label} value={value} />
      ))}
    </div>
  )
})

export default TaskStats
