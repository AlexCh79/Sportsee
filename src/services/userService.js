// Endpoint sur user-info
import { apiFetch } from "./api";

export function fetchUserInfo() {
    return apiFetch('/api/user-info')
}