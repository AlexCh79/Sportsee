import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Context from "../../context/Context";

function PrivateRoute() {
    // Récupération de l'utilisateur et du chargement depuis le provider
    const {user, isLoading} = useContext(Context);

    // N'affiche rien tant que les données chargent
    if(isLoading) {
        return null;
    }

    // Si l'utilisateur n'est pas connecté, redirection vers page login
    if(!user) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />
}

export default PrivateRoute