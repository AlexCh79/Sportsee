import { NavLink } from 'react-router-dom'
import './header.css'

function Header() {
  return (
    <header className="header">
      <div>
        <img src="/logo.png" alt="Logo" className="logo" />
        <nav className="nav-bar">
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/profile" className="nav-link">Mon Profil</NavLink>
          <NavLink to="/logout" className="nav-link">Se déconnecter</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header