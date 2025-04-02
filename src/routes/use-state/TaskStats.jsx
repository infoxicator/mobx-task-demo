import { memo, useMemo } from 'react'
import StatsItem from './StatsItem'
const TaskStats = memo(({ tasks }) => {
  console.log('TaskStats rendered')

  const stats = useMemo(() => [
    { label: 'Total Tasks', value: tasks.length },
    { label: 'Completed', value: tasks.filter(t => t.completed).length },
    { label: 'Pending', value: tasks.filter(t => !t.completed).length },
    { label: 'Completion Rate', value: tasks.length 
      ? ((tasks.filter(t => t.completed).length / tasks.length) * 100).toFixed(1)
      : 0
    }
  ], [tasks])

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {stats.map((stat) => (
        <StatsItem key={stat.label} {...stat} />
      ))}
    </div>
  )
})

export default TaskStats
