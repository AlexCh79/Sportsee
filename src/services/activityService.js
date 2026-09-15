// Endpoint sur l'activité utilisateur
import { apiFetch } from "./api";

export function fetchUserActivity(startWeek, endWeek) {
    return apiFetch(`/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`)
}