import './login.css'

function Login() {
    return (
        <div className="login">
            <div className="left-column">
                <div className="form-container">
                    <form className="login-form" method="post" action="/dashboard">
                        <h3>Transformez vos stats en résultats</h3>
                        <h4>Se connecter</h4>
                        <label htmlFor="username">Nom d'utilisateur :</label>
                        <input id="username" name="username" alt="pseudo" />
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" name="password" />
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