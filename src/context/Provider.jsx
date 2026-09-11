import { useState, useEffect } from "react";
import Context from "./Context";
import { userMock } from "../datas/users-mock";
import { activitiesMock } from "../datas/activities-mock";

function Provider({children}) {
    const [user, setUser] = useState(null);
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        loadUser()
    }, []);

    const loadUser = () => {
        const id = localStorage.getItem('userId');

        if(!id) return;

        // Récupération des données de l'utilisateur connecté
        const foundUser = userMock.find((u) => u.id === id);
        const foundActivity = activitiesMock.find((a) => a.id === id);

        // Mise à jour des states
        setUser(foundUser);
        setActivity(foundActivity);
    };

    return (
        <Context.Provider value={{user, activity, loadUser}}>
            {children}
        </Context.Provider>
    );

}

export default Provider