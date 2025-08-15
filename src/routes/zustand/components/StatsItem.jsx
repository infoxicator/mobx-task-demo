import React from 'react'
import { useTasksStore } from '../tasks-store'

const StatsItem = ({ label, statKey, formatter }) => {
  console.log(`StatsItem ${label} rendered`)

  const value = useTasksStore((state) => state[statKey])

  return (
    <div className="stat-item">
      <span className="stat-label">{label}:</span>
      <span className="stat-value">{formatter ? formatter(value) : value}</span>
    </div>
  )
}

StatsItem.displayName = 'StatsItem'
export default StatsItem 