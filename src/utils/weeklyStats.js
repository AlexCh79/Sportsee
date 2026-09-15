export function summarizeWeek(activities) {
    const totalDuration = weekActivities.reduce((sum, activity) => sum + activity.duration, 0)
    const totalDistance = weekActivities.reduce((sum, activity) => sum + activity.distance, 0)

    return {
        sessionsCount: weekActivities.length,
        totalDuration,
        totalDistance: Math.round(totalDistance * 10) / 10,
    }
}