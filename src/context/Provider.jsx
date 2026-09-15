import { useState, useEffect } from "react";
import Context from "./Context";
import { login as loginRequest } from "../services/authService";
import { fetchUserInfo } from "../services/userService";
import { setCookie, getCookie, deleteCookie } from "../utils/cookies";

function Provider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser()
    }, []);

    /**
     * Vérification de la connexion en cours de l'utilisateur
     */
    const loadUser = async () => {
        const token = getCookie('token');

        if(!token) {
            setIsLoading(false);
            return;
        };

        // Vérification du token
        try {
            const userInfo = await fetchUserInfo()
            setUser(userInfo)
        } catch {
            deleteCookie('token')
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Connexion utilisateur et intégration du token dans le cookie
     */
    const login = async (username, password) => {
        try {
            const { token } = await loginRequest(username, password)
            setCookie('token', token, 1)

            const userInfo = await fetchUserInfo()
            setUser(userInfo)

            return true
        } catch {
            return false
        }

    }

    /**
     * Déconnexion utilisateur et nettoyage du cookie
     */
    const logout = () => {
        deleteCookie('token')
        setUser(null)
    }

    return (
        <Context.Provider value={{user, isLoading, login, logout}}>
            {children}
        </Context.Provider>
    );

}

export default Provider