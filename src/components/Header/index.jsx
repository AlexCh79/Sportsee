import { NavLink, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { useContext } from "react";
import './header.css'

function Header () {

    /**
     * Récupération de la fonction Logout depuis le context
     */
    const {logout} = useContext(Context);
    const navigate = useNavigate();

    // Appel de la fonction logout et renvoie vers la page de connexion
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate('/');
    }

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
                    <NavLink to='/' onClick={handleLogout}>Se déconnecter</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header