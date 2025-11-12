const StatsItem = ({ label, value }) => {
  return (
    <div className="stat-item">
      <label>{label}:</label>
      <span>{value}</span>
    </div>
  )
}

export default StatsItem
