import './login.css'
import Context from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();
    const {login} = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Envoi des données vers la fonction login
        const success = login(username, password);

        // Erreur si la fonction login echoue
        if(!success) {
            setError('L\'identifiant ou le mot de passe sont erronés.');
            return;
        }

        // Renvoie vers le tableau de bord si utilisateur connecté
        navigate('/dashboard');

    }

    return (
        <div className="login">            
            <div className="left-column">
                <img alt='logo' src='/logo.png' className='logo-home' />
                <div className="form-container">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3>Transformez vos stats en résultats</h3>
                        <h4>Se connecter</h4>
                        <label htmlFor="username">Nom d'utilisateur :</label>
                        <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {error && <p className="error-message">{error}</p>}
                        <button className="blue-btn" type="submit">Se connecter</button>
                        <span>Mot de passe oublié ?</span>
                    </form>
                </div>
            </div>
            <div className="background-container">
                <img src="/background_picture.png" alt="" />
                <p className='float'>Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</p>
            </div>
        </div>
    )
}

export default Login