// Gestion des call API
import { API_BASE_URL } from "../config/api";
import { getCookie } from "../utils/cookies";

export async function apiFetch(path, options = {}) {
    const token = getCookie('token')
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    }

    // Stockage du token dans le header
    if(token) {
        headers.Authorization = `Bearer ${token}`
    }

    // Construit le endpoint selon le chemin donné
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    })

    // Récupération de la réponse API
    const body = await response.json()

    // Message d'erreur si pas de réponse renvoyée par l'api
    if(!response.ok) {
        throw new Error(body.message || 'Une erreur est survenue')
    }

    // Tout est ok, renvoie des données vers le front
    return body
}