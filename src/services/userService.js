import { apiFetch } from './api'
import { USE_MOCK_DATA } from '../config/api'
import { getCookie } from '../utils/cookies'
import { userMock } from '../datas/users-mock'

function fetchUserInfoFromMock() {
    const userId = getCookie('token')
    const user = userMock.find((u) => u.id === userId)

    if (!user) {
        return Promise.reject(new Error('User not found'))
    }

    return Promise.resolve({ profile: user.profile, statistics: user.statistics })
}

export function fetchUserInfo() {
    if (USE_MOCK_DATA) {
        return fetchUserInfoFromMock()
    }

    return apiFetch('/api/user-info')
}