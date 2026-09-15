import { isSameDay } from "./dateHelpers"

// Calcul des fréquences cardiaques

    const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

    export function bucketHeartRateByDay(activities, weekStart) {
        return DAY_LABELS.map((label, index) => {
            const currentDate = new Date(weekStart)
            currentDate.setDate(currentDate.getDate() + index)

            const dayActivity = activities.find(
                (activity) => isSameDay(new Date(activity.date), currentDate)
            )

            return {
                day: label,
                min: dayActivity ? dayActivity.heartRate.min : null, 
                max: dayActivity ? dayActivity.heartRate.max : null,
                average: dayActivity ? dayActivity.heartRate.average : null,
            }
        })
    }