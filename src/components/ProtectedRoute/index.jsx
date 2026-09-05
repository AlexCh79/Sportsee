import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    // Récupération de l'ID connecté dans le stockage locale
    const userId = localStorage.getItem("userId");

    // Si pas connecté, redirection vers la page de connexion
    if(!userId) {
        return <Navigate to="/" replace />;
    }

    // Sinon, renvoie les routes enfants (Dashboard et Profile)
    return children;
}