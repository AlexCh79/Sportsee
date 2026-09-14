export function formatLongDate(date) {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

export function formatShortDate(date) {
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}`
}