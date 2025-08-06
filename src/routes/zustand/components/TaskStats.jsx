import React from 'react'
import { useTasks } from '../tasks-store'
import StatsItem from './StatsItem'

const TaskStats = () => {
  const tasks = useTasks()
  
  console.log('TaskStats rendered')

  const completed = tasks.filter(t => t.completed).length;
  const stats = [
    { label: 'Total Tasks', value: tasks.length },
    { label: 'Completed', value: completed },
    { label: 'Pending', value: tasks.length - completed },
    { label: 'Completion Rate', value: tasks.length 
      ? ((completed / tasks.length) * 100).toFixed(1) + '%'
      : '0%'
    }
  ];

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {stats.map((stat) => (
        <StatsItem key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  )
}

TaskStats.displayName = 'TaskStats'
export default TaskStats 