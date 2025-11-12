import { useValue } from '@legendapp/state/react'
import { legendStore } from '../../stores/TaskStoreLegendState'
import StatsItem from './StatsItem'

const TaskStats = () => {
  const stats = useValue(legendStore.stats)

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {stats.map(({ label, value }) => (
        <StatsItem key={label} label={label} value={value} />
      ))}
    </div>
  )
}

export default TaskStats
