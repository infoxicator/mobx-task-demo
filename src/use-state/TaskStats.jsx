import { memo, useMemo } from 'react'

const TaskStats = memo(({ tasks }) => {
  console.log('TaskStats rendered')

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    completionRate: tasks.length 
      ? ((tasks.filter(t => t.completed).length / tasks.length) * 100).toFixed(1)
      : 0
  }), [tasks])

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      <div className="stat-item">
        <label>Total Tasks:</label>
        <span>{stats.total}</span>
      </div>
      <div className="stat-item">
        <label>Completed:</label>
        <span>{stats.completed}</span>
      </div>
      <div className="stat-item">
        <label>Pending:</label>
        <span>{stats.pending}</span>
      </div>
      <div className="stat-item">
        <label>Completion Rate:</label>
        <span>{stats.completionRate}%</span>
      </div>
    </div>
  )
})

export default TaskStats
