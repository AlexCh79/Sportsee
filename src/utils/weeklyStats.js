export function summarizeWeek(activities) {
    const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0)
    const totalDistance = activities.reduce((sum, activity) => sum + activity.distance, 0)

    return {
        sessionsCount: activities.length,
        totalDuration,
        totalDistance: Math.round(totalDistance * 10) / 10,
    }
}