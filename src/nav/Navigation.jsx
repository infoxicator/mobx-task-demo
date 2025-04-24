import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
      <li>
          <Link 
            to="/use-state" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            use-state
          </Link>
        </li>
        <li>
          <Link 
            to="/mobx" 
            className={({ isActive }) => isActive ? 'active' : ''}
            end
          >
            Mobx
          </Link>
        </li>
        <li>
          <Link 
            to="/mobx-query" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Mobx-query
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation 