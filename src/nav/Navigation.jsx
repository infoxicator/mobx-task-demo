import { NavLink } from 'react-router'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
      <li>
          <NavLink 
            to="/use-state" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            use-state
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mobx" 
            className={({ isActive }) => isActive ? 'active' : ''}
            end
          >
            Mobx
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mobx-query" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Mobx-query
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/zustand" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Zustand
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation 