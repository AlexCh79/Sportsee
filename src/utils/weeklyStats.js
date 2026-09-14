import { getMonday } from "./dateHelpers";

export function getWeeklyStats(activities) {
    if(!activities || activities.length === 0) {
        return { sessionsCount: 0, totalDuration: 0, totalDistance: 0, periodStart: null, periodEnd: null }
    }

    const dates = activities.map((activity) => new Date(activity.date))
    const lastestDate = new Date(Math.max(...dates))

    const monday = getMonday(lastestDate)
    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)

    const weekActivities = activities.filter((activity) => {
        const activityDate = new Date(activity.date)
        return activityDate >= monday && activityDate <= sunday
    })

    const totalDuration = weekActivities.reduce((sum, activity) => sum + activity.duration, 0)
    const totalDistance = weekActivities.reduce((sum, activity) => sum + activity.distance, 0)

    return {
        sessionsCount: weekActivities.length,
        totalDuration,
        totalDistance: Math.round(totalDistance * 10) / 10,
        periodStart: monday,
        periodEnd: sunday,
    }
}