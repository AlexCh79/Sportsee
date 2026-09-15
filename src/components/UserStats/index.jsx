import { useContext } from 'react'
import Context from '../../context/Context'
import { useApiRequest } from '../../hooks/useApiRequest'
import { fetchUserActivity } from '../../services/activityService'
import { formatFullDate, diffInDays } from '../../utils/dateHelpers'
import UserStatCard from '../UserStatCard'
import './userStats.css'

function toISODate(date) {
    return date.toISOString().slice(0, 10)
}

function UserStats() {
    const { user } = useContext(Context)

    const createdAt = user ? new Date(user.profile.createdAt) : null
    const today = new Date()

    const { data: activities, isLoading, error } = useApiRequest(
        () => fetchUserActivity(toISODate(createdAt), toISODate(today)),
        [user?.profile.createdAt]
    )

    if (!user) return null

    const totalHours = Math.round(user.statistics.totalDuration / 60)

    const totalCalories = activities
        ? activities.reduce((sum, session) => sum + session.caloriesBurned, 0)
        : 0

    const restDays = activities
        ? Math.max(diffInDays(createdAt, today) - user.statistics.totalSessions, 0)
        : 0

    return (
        <div className="user-stats">
            <div className="user-stats-row">
                <h4 className="user-stats-title">Vos statistiques</h4>
                <span className="user-stats-subtitle">Depuis le {formatFullDate(createdAt)}</span>
            </div>

            {isLoading && <p className="chart-card-status">Chargement...</p>}
            {error && <p className="chart-card-status chart-card-error">{error}</p>}

            {!isLoading && !error && (
                <div className="user-stats-cards">
                    <UserStatCard title="Temps total couru" value={totalHours} unit="heures" />
                    <UserStatCard title="Distance totale" value={user.statistics.totalDistance} unit="km" />
                    <UserStatCard title="Nombre de séances" value={user.statistics.totalSessions} unit="séances" />
                    <UserStatCard title="Calories brûlées" value={totalCalories} unit="kcal" />
                    <UserStatCard title="Jours de repos" value={restDays} unit="jours" />
                </div>
            )}
        </div>
    )
}

export default UserStats