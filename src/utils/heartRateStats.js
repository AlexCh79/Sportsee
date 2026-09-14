import { isSameDay, getMonday } from "./dateHelpers"

// Calcul des fréquences cardiaques

    const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

    function getDailyHeartRate(activities, weekOffset = 0) {
        // Retourne un objet vide si pas d'activité
        if(!activities || activities.length === 0) {
            return {day: [], periodStart: null, periodEnd: null, canGoPrevious: false, canGoNext: false}
        }

        const dates = activities.map((activity) => new Date(activity.date))
        const latest = new Date(Math.max(...dates))
        const earliest = new Date(Math.min(...dates))

        const lastestMonday = getMonday(latest)
        const monday = new Date(lastestMonday)
        monday.setDate(monday.getDate() - weekOffset * 7)

        const days = DAY_LABELS.map((label, index) => {
            const currentDate = new Date(monday)
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

        const periodStart = monday
        const periodEnd = new Date(monday)
        periodEnd.setDate(periodEnd.getDate() + 6)

        return {
            days,
            periodStart,
            periodEnd,
            canGoPrevious: earliest < periodStart,
            canGoNext: weekOffset > 0,
        }
    }


export default getDailyHeartRate