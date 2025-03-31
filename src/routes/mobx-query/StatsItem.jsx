import { observer } from 'mobx-react-lite'

const StatsItem = observer(({ label, value }) => {
  return (
    <div key={label} className="stat-item">
      <label>{label}:</label>
      <span>{value}</span>
    </div>
  )
})    

export default StatsItem