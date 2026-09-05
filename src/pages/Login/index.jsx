import './login.css'
import { LoginMock } from '../../services/LoginMock'
import { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Login() {

    // Préparation des champs du formulaire
    const [redirect, setRedirect] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    // Préparation d'un champ erreur
    const [error, setError] = useState("");

    // Nettoyage des données saisies
    function handleChange(event) {
        setForm({
            ...form,
            [event.target.id]: event.target.value.trim() 
        });
    }

    // Envoi des données
    function handleSubmit(event) {
        event.preventDefault();

        // Appel de la fonction de login
        const {succes, error} = LoginMock(form.username, form.password);

        // Si login échoué, récupération du message d'erreur
        if(!succes) {
            setError(error);
            return;
        }

        setRedirect(true);
    }

    // Redirection vers le dashboard utilisateur


    if(redirect) {
        return (
            <Navigate to="/dashboard" replace />
        )
    }


    return (
        <div className="login-container">
            <div className='left-column'>
                <form onSubmit={handleSubmit} method="POST" className="login-form">
                    <h3>Transformer vos stats en résultats</h3>
                    <h4>Se connecter</h4>
                    <label htmlFor="username">Nom d'utilisateur :</label>
                    <input id="username" value={form.username} onChange={handleChange} />
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" value={form.password} onChange={handleChange}/>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Se connecter</button>
                    <a href="/forgot-password">Mot de passe oublié ?</a>
                </form>
            </div>
                <img src="/background_picture.png" alt="" className="background-image" />
                <p className='floating-text'>Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</p>
        </div>
    );
}