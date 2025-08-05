import React from 'react';

const StatsItem = ({ label, value }) => {
  console.log(`StatsItem ${label} rendered`);
  
  return (
    <div className="stat-item">
      <span className="stat-label">{label}:</span>
      <span className="stat-value">{value}</span>
    </div>
  );
};

StatsItem.displayName = 'StatsItem';
export default StatsItem; 