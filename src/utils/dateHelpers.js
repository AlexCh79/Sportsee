export function formatLongDate(date) {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

export function formatShortDate(date) {
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}`
}

export function formatMiddleDate(date) {
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${day}/${month}/${year}`
}

// Récupération du lundi de la semaine
export  function getMonday(date){
    const result = new Date(date)
    const dayIndex = (result.getDay() + 6) / 7
    result.setDate(result.getDate() - dayIndex)
    return result
}

export function isSameDay(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear()
        && dateA.getMonth() === dateB.getMonth()
        && dateA.getDate() === dateB.getDate()
}

export function formatFullDate(date) {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function diffInDays(startDate, endDate) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24
    return Math.round((endDate - startDate) / millisecondsPerDay)
}