import { useContext, useMemo } from 'react'
import Context from '../../context/Context'
import { formatFullDate, diffInDays } from '../../utils/dateHelpers'
import UserStatCard from '../UserStatCard'
import './userStats.css'

function UserStats() {

    const { user, activity } = useContext(Context)

    if(!user) {
        return null
    }
    const totalCalories = useMemo(() => {
        if(!activity) return 0
        return activity.activities.reduce((sum, session) => sum + session.caloriesBurned, 0)
    }, [activity])

    const totalHours = Math.round(user.statistics.totalDuration / 60) 

    const restDays = useMemo(() => {
        if(!user || !activity || activity.activities.length === 0) return 0

        const dates = activity.activities.map((session) => new Date(session.date))
        const latestActivityDate = new Date(Math.max(...dates))
        const createdAt = new Date(user.profile.createdAt)
        const daysSinceRegistration = diffInDays(createdAt, latestActivityDate)

        return Math.max(daysSinceRegistration - user.statistics.totalSessions, 0)
    }, [user, activity])

    return (
        <div className='user-stats'>
            <div className='user-stats-row'>
                <h4 className='user-stats-title'>Vos statistiques</h4>
                <span className='user-stats-subtitle'>Depuis le {formatFullDate(new Date(user.profile.createdAt))}</span>
            </div>
            <div className='user-stats-cards'>
                <UserStatCard title="Temps total couru" value={totalHours} unit="heures" />
                <UserStatCard title="Calories brûlées" value={totalCalories} unit="cal" />
                <UserStatCard title="Distance totale parcourues" value={user.statistics.totalDistance} unit="km" />
                <UserStatCard title="Nombre de jours de repos" value={restDays} unit="jours" />
                <UserStatCard title="Nombre de sessions" value={user.statistics.totalSessions} unit="sessions" />            
            </div>            
        </div>
    )
}

export default UserStats