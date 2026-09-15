import { formatShortDate } from "./dateHelpers";

// Calcul des moyennes d'activité en distance parcourue
export function bucketDistanceByWeek(activities, rangeStart) {
    const weeksAgoList = [4, 3, 2, 1]

    return weeksAgoList.map((weeksAgo, index) => {
        const start = new Date(rangeStart)
        start.setDate(start.getDate() + (4 - weeksAgo) * 7)

        const end = new Date(start)
        end.setDate(end.getDate() + 6)

        const totalDistance = activities
            .filter((activity) => {
                const activityDate = new Date(activity.date)
                return activityDate >= start && activityDate <= end
            })
            .reduce((sum, activity) => sum + activity.distance, 0)

        return {
            week: `${index + 1}`,
            km: Math.round(totalDistance * 10) / 10,
            dateRange: `${formatShortDate(start)} au ${formatShortDate(end)}`,
        }
    })
}