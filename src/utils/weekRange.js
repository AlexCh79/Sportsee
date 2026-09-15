// Détermination des jours de la semaine et de leurs dates

import { getMonday } from "./dateHelpers";

function toISODate(date) {
    return date.toISOString().slice(0, 10)
}

// Récupération des dates pour une seule semaine
export function getOneWeekRange(weekOffset) {
    const currentMonday = getMonday(new Date())
    const monday = new Date(currentMonday)
    monday.setDate(monday.getDate() - weekOffset * 7)

    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)

    return {
        startDate: monday,
        endDate, sunday,
        startWeek: toISODate(monday),
        endWeek: toISODate(sunday),
    }
}

// Récupération des dates sur 4 semaines
export function getFourWeekRange(weekOffset) {
    const { startDate: currentMonday } = getOneWeekRange(0)
    
    const end = new Date(currentMonday)
    end.setDate(end.getDate() - weekOffset * 28 + 6)

    const start = new Date(end)
    start.setDate(start.getDate() - 27)

    return {
        startDate: start,
        endDate: end,
        startWeek: toISODate(start),
        endWeek: toISODate(end),
    }
}