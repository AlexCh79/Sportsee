import { useContext, useMemo } from "react";
import Context from "../../../../context/Context";
import { getWeeklyStats } from "../../../../utils/weeklyStats";
import { formatMiddleDate } from "../../../../utils/dateHelpers";
import WeeklyGoalChart from "../../../../components/Charts/WeeklyGoalChart";
import WeekStatCard from "../../../../components/WeekStatCard";
import './thisWeek.css'


function ThisWeek() {
    const { user, activity } = useContext(Context)

    const weekSummary = useMemo(() => {
        if (!activity) return { sessionsCount: 0, totalDuration: 0, totalDistance: 0, periodStart: null, periodEnd: null }
        return getWeeklyStats(activity.activities)
    }, [activity])

    const periodLabel = weekSummary.periodStart && weekSummary.periodEnd
        ? `Du ${formatMiddleDate(weekSummary.periodStart)} au ${formatMiddleDate(weekSummary.periodEnd)}`
        : ''

    return (
        <div className="this-week">
            <h4 className="section-title">Cette semaine</h4>
            <span className="this-week-period">{periodLabel}</span>

            <div className="this-week-row">
                <div className="week-goal-card">
                    <p className="week-goal-value">
                        <span className="week-goal-count">x{weekSummary.sessionsCount}</span>{' '}
                        sur objectif de {user.weeklyGoal}
                    </p>
                    <span className="week-goal-subtitle">Courses hebdomadaire réalisées</span>
                    <WeeklyGoalChart completed={weekSummary.sessionsCount} goal={user.weeklyGoal} />
                </div>

                <div className="week-stats-column">
                    <WeekStatCard 
                        label="Durée d'activité"
                        value={weekSummary.totalDuration}
                        unit="minutes"
                        color="var(--dark-blue)"
                        paleColor='#B6BDFC'
                    />
                    <WeekStatCard 
                        label="Distance"
                        value={weekSummary.totalDistance}
                        unit="kilomètres"
                        color="#F4320B"
                        paleColor='#FCC1B6'
                    />
                </div>

            </div>
        </div>
    )
}

export default ThisWeek