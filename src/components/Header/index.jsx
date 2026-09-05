import { NavLink } from 'react-router-dom'
import './header.css'

function Header() {
  return (
    <header className="header">
      <div>
        <img src="/logo.png" alt="Logo" className="logo" />
        <nav className="nav-bar">
          <div className='nav-left'>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/profile" className="nav-link">Mon Profil</NavLink>
          </div>
          <NavLink to="/logout" className="nav-link logout">Se déconnecter</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header