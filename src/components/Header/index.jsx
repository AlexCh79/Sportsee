import { NavLink } from "react-router-dom";

function Header () {
    return (
        <header>
            <div className="left-header">
                <img className="logo" alt="Logo" src="/logo.png" />
            </div>
            <div className="nav-bar">
                <nav className="left-nav-bar">
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                    <NavLink to='/profile'>Mon profil</NavLink>
                </nav>
                <nav className="right-nav-bar">
                    <NavLink to='/logout'>Se déconnecter</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header