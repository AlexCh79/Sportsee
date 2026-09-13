// Calcul des moyenne par semaine

function formatShortDate(date) {
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}`
}

export function formatLongDate(date) {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

export function getWeeklyDistance(activities, weekOffset = 0) {

    // Retourne un tableau vide pas d'activités
    if(!activities || activities.length === 0){
        return { weeks: [], periodStart: null, periodEnd: null, canGoPrevious: false, canGoNext: false }
    };

    const dates = activities.map(
        (activity) => new Date(activity.date)
    );

    const lastestDate = new Date(Math.max(...dates));
    const earliestDate = new Date(Math.min(...dates))

    const referenceDate = new Date(lastestDate)
    referenceDate.setDate(referenceDate.getDate() - weekOffset * 28)

    const weeksAgoList = [4, 3, 2, 1];

    const weeks = weeksAgoList.map(
        (weeksAgo, index) => {
            const end = new Date(referenceDate)
            end.setDate(end.getDate() - (weeksAgo - 1) * 7)

            const start = new Date(end)
            start.setDate(start.getDate() - 6)

            const totalDistance = activities
                .filter((activity) => {
                    const activityDate = new Date(activity.date)
                    return activityDate >= start && activityDate <= end
                })
                .reduce((sum, activity) => sum + activity.distance, 0)

            return {
                week: `S${index + 1}`,
                km: Math.round(totalDistance * 10) / 10,
                dateRange: `${formatShortDate(start)} au ${formatShortDate(end)}`,
                weekStart: start,
                weekEnd: end,
            }
        }) 

    const periodStart = weeks[0].weekStart
    const periodEnd = weeks[weeks.length - 1].weekEnd

    return {
        weeks,
        periodStart,
        periodEnd,
        canGoPrevious: earliestDate < periodStart,
        canGoNext: weekOffset > 0,
    }
}