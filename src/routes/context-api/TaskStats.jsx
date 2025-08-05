import React, { memo } from 'react';
import { useTaskContext } from './TaskContext';
import StatsItem from './StatsItem';

const TaskStats = memo(() => {
  const { stats } = useTaskContext();
  
  console.log('TaskStats rendered');

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {stats.map((stat) => (
        <StatsItem key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
});

TaskStats.displayName = 'TaskStats';
export default TaskStats; 