import { useContext } from 'react'
import Context from '../../../../context/Context'
import { useApiRequest } from '../../../../hooks/useApiRequest'
import { fetchUserActivity } from '../../../../services/activityService'
import { getOneWeekRange } from '../../../../utils/weekRange'
import { summarizeWeek } from '../../../../utils/weeklyStats'
import { formatShortDate } from '../../../../utils/dateHelpers'
import WeeklyGoalChart from '../../../../components/Charts/WeeklyGoalChart'
import WeekStatCard from '../../../../components/WeekStatCard'
import './thisWeek.css'

// TODO: retirer ce fallback une fois que /api/user-info renverra weeklyGoal pour chaque utilisateur
const FALLBACK_WEEKLY_GOAL = 3

function ThisWeek() {
    const { user } = useContext(Context)
    const currentWeek = getOneWeekRange(0)

    const { data: activities, isLoading, error } = useApiRequest(
        () => fetchUserActivity(currentWeek.startWeek, currentWeek.endWeek),
        [currentWeek.startWeek, currentWeek.endWeek]
    )

    if (!user) return null

    const weeklyGoal = user.weeklyGoal ?? FALLBACK_WEEKLY_GOAL
    const summary = activities ? summarizeWeek(activities) : { sessionsCount: 0, totalDuration: 0, totalDistance: 0 }

    return (
        <div className="this-week">
            <h4 className="section-title">Cette semaine</h4>
            <span className="this-week-period">
                {`Du ${formatShortDate(currentWeek.startDate)} au ${formatShortDate(currentWeek.endDate)}`}
            </span>

            {isLoading && <p className="chart-card-status">Chargement...</p>}
            {error && <p className="chart-card-status chart-card-error">{error}</p>}

            {!isLoading && !error && (
                <div className="this-week-row">
                    <div className="week-goal-card">
                        <p className="week-goal-value">
                            <span className="week-goal-count">x{summary.sessionsCount}</span>{' '}
                            sur objectif de {weeklyGoal}
                        </p>
                        <span className="week-goal-subtitle">Courses hebdomadaire réalisées</span>
                        <WeeklyGoalChart completed={summary.sessionsCount} goal={weeklyGoal} />
                    </div>

                    <div className="week-stats-column">
                        <WeekStatCard label="Durée d'activité" value={summary.totalDuration} unit="minutes" color="var(--dark-blue)" paleColor="#9CA3F5" />
                        <WeekStatCard label="Distance" value={summary.totalDistance} unit="kilomètres" color="#FF0101" paleColor="#FFB4A8" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ThisWeek