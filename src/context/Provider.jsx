import { useState, useEffect } from "react";
import Context from "./Context";
import { userMock } from "../datas/users-mock";
import { activitiesMock } from "../datas/activities-mock";

function Provider({children}) {
    const [user, setUser] = useState(null);
    const [activity, setActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser()
    }, []);

    /**
     * Récupération de l'utilisateur connecté et de ses données
     */
    const loadUser = () => {
        const id = localStorage.getItem('userId');

        if(!id) {
            setIsLoading(false);
            return;
        };

        // Récupération des données de l'utilisateur connecté
        const foundUser = userMock.find((u) => u.id === id);
        const foundActivity = activitiesMock.find((a) => a.id === id);

        // Mise à jour des states
        setUser(foundUser);
        setActivity(foundActivity);
        setIsLoading(false);
    };

    /**
     * Connexion utilisateur
     */
    const login = (username, password) => {
        const foundUser = userMock.find(
            (u) => u.username === username && u.password === password
        )

        // Si pas d'utilisateur correspondant, on retourne false pour erreur
        if(!foundUser) {
            return false;
        }

        // Si utilisateur trouvé, on stocke dans le localStorage
        localStorage.setItem('userId', foundUser.id);

        // Récupération des activités de l'utilisateur
        const foundActivity = activitiesMock.find(
            (a) => a.id === foundUser.id
        )

        setUser(foundUser);
        setActivity(foundActivity);

        return true;
    }

    /**
     * Déconnexion utilisateur
     */
    const logout = () => {
        localStorage.removeItem('userId');
        setUser(null);
        setActivity(null);
    }

    return (
        <Context.Provider value={{user, activity, isLoading, login, loadUser, logout}}>
            {children}
        </Context.Provider>
    );

}

export default Provider