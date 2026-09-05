import { Navigate } from "react-router-dom";

export default function Logout() {
    localStorage.removeItem("userId");

    return <Navigate to="/" replace />
}