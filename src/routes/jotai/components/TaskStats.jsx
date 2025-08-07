import React from 'react';
import { useAtomValue } from 'jotai';
import { completedTasksAtom, totalTasksAtom } from '../atoms';
import StatsItem from './StatsItem';

const TaskStats = () => {
  const completed = useAtomValue(completedTasksAtom);
  const total = useAtomValue(totalTasksAtom);

  const stats = [
    { label: 'Total Tasks', value: total },
    { label: 'Completed', value: completed },
    { label: 'Pending', value: total - completed },
    { 
      label: 'Completion Rate', 
      value: total > 0 ? `${((completed / total) * 100).toFixed(1)}%` : '0%'
    }
  ];

  return (
    <div className="task-stats">
      <h2>Statistics</h2>
      {stats.map((stat) => (
        <StatsItem key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};

TaskStats.displayName = 'TaskStats'
export default TaskStats 