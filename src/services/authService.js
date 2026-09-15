// Envoi du login vers l'API
import { apiFetch } from "./api";

export function login(username, password) {
    return apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
    })
}