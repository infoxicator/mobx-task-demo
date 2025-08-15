import React from 'react'
import StatsItem from './StatsItem'
import { useTasksStore } from '../tasks-store'

const TaskStats = () => {  
  // console.log('TaskStats rendered')

  const useRelativeStats = useTasksStore(state => state.useRelativeStats)
  const setUseRelativeStats = useTasksStore(state => state.setUseRelativeStats)
  const handleUseRelativeStatsChange = (e) => {
    setUseRelativeStats(e.target.checked)
  }

  const stats = [
    { label: 'Total Tasks', key: 'totalTasks' },
    { label: 'Completed', key: 'completedTasks' },
    { label: 'Pending', key: 'pendingTasks' },
    { label: 'Completion Rate',  key: 'completionRate', formatter: (value) => `${value.toFixed(1)}%` },
  ];

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      <div>Display relative stats: <input type="checkbox" checked={useRelativeStats} onChange={handleUseRelativeStatsChange} /></div>
      {stats.map((stat) => (
        <StatsItem key={stat.label} label={stat.label} statKey={stat.key} value={stat.value} formatter={stat?.formatter} />
      ))}
    </div>
  )
}

TaskStats.displayName = 'TaskStats'
export default TaskStats 