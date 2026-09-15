import { apiFetch } from './api'
import { USE_MOCK_DATA } from '../config/api'
import { userMock } from '../datas/users-mock'

function loginWithMock(username, password) {
    const user = userMock.find((u) => u.username === username && u.password === password)

    if (!user) {
        return Promise.reject(new Error('Invalid credentials'))
    }

    // On utilise l'id comme "faux token" — un mock n'a pas de vrai JWT à fournir, ce sera le username fourni
    return Promise.resolve({ token: user.id, userId: user.id })
}

export function login(username, password) {
    if (USE_MOCK_DATA) {
        return loginWithMock(username, password)
    }

    return apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })
}