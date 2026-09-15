import { apiFetch } from './api'
import { USE_MOCK_DATA } from '../config/api'
import { getCookie } from '../utils/cookies'
import { activitiesMock } from '../datas/activities-mock'

function fetchUserActivityFromMock(startWeek, endWeek) {
    const userId = getCookie('token')
    const userActivities = activitiesMock.find((entry) => entry.id === userId)

    if (!userActivities) {
        return Promise.resolve([])
    }

    const start = new Date(startWeek)
    const end = new Date(endWeek)

    const filtered = userActivities.activities.filter((activity) => {
        const date = new Date(activity.date)
        return date >= start && date <= end
    })

    return Promise.resolve(filtered)
}

export function fetchUserActivity(startWeek, endWeek) {
    if (USE_MOCK_DATA) {
        return fetchUserActivityFromMock(startWeek, endWeek)
    }

    return apiFetch(`/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`)
}