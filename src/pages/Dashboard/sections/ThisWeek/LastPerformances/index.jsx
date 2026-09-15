import { useContext, useState, useMemo } from 'react'
import Context from '../../../../context/Context'
import { useApiRequest } from '../../../../hooks/useApiRequest'
import { fetchUserActivity } from '../../../../services/activityService'
import { getFourWeekRange, getOneWeekRange } from '../../../../utils/weekRange'
import { bucketDistanceByWeek } from '../../../../utils/activityStats'
import { bucketHeartRateByDay } from '../../../../utils/heartRateStats'
import { formatLongDate } from '../../../../utils/dateHelpers'
import GraphCard from '../../../../components/GraphCard'
import DistanceChart from '../../../../components/Charts/DistanceChart'
import HeartRateChart from '../../../../components/Charts/HeartRateChart'

function LastPerformances() {
    const { user } = useContext(Context)
    const [weekOffset, setWeekOffset] = useState(0)
    const [heartWeekOffset, setHeartWeekOffset] = useState(0)

    const distanceRange = getFourWeekRange(weekOffset)
    const heartRange = getOneWeekRange(heartWeekOffset)

    const { data: distanceActivities, isLoading: distanceLoading, error: distanceError } = useApiRequest(
        () => fetchUserActivity(distanceRange.startWeek, distanceRange.endWeek),
        [distanceRange.startWeek, distanceRange.endWeek]
    )

    const { data: heartActivities, isLoading: heartLoading, error: heartError } = useApiRequest(
        () => fetchUserActivity(heartRange.startWeek, heartRange.endWeek),
        [heartRange.startWeek, heartRange.endWeek]
    )

    const distanceWeeks = useMemo(() => {
        if (!distanceActivities) return []
        return bucketDistanceByWeek(distanceActivities, distanceRange.startDate)
    }, [distanceActivities, distanceRange.startDate])

    const heartDays = useMemo(() => {
        if (!heartActivities) return []
        return bucketHeartRateByDay(heartActivities, heartRange.startDate)
    }, [heartActivities, heartRange.startDate])

    const averageDistance = useMemo(() => {
        if (distanceWeeks.length === 0) return 0
        const total = distanceWeeks.reduce((sum, week) => sum + week.km, 0)
        return Math.round((total / distanceWeeks.length) * 10) / 10
    }, [distanceWeeks])

    const averageBPM = useMemo(() => {
        const validDays = heartDays.filter((day) => day.average !== null)
        if (validDays.length === 0) return 0
        const total = validDays.reduce((sum, day) => sum + day.average, 0)
        return Math.round(total / validDays.length)
    }, [heartDays])

    if (!user) return null

    return (
        <>
            <h4 className="section-title">Vos dernières performances</h4>
            <div className="performance-row">
                <GraphCard
                    headerValue={`${String(averageDistance).replace('.', ',')}km en moyenne`}
                    headerColor="var(--dark-blue)"
                    subtitle="Total des kilomètres 4 dernières semaines"
                    periodLabel={`${formatLongDate(distanceRange.startDate)} - ${formatLongDate(distanceRange.endDate)}`}
                    onPrevious={() => setWeekOffset((prev) => prev + 1)}
                    onNext={() => setWeekOffset((prev) => Math.max(prev - 1, 0))}
                    canGoPrevious={true}
                    canGoNext={weekOffset > 0}
                    isLoading={distanceLoading}
                    error={distanceError}
                >
                    <DistanceChart data={distanceWeeks} />
                </GraphCard>

                <GraphCard
                    headerValue={`${averageBPM} BPM`}
                    headerColor="#FF0101"
                    subtitle="Fréquence cardiaque moyenne"
                    periodLabel={`${formatLongDate(heartRange.startDate)} - ${formatLongDate(heartRange.endDate)}`}
                    onPrevious={() => setHeartWeekOffset((prev) => prev + 1)}
                    onNext={() => setHeartWeekOffset((prev) => Math.max(prev - 1, 0))}
                    canGoPrevious={true}
                    canGoNext={heartWeekOffset > 0}
                    isLoading={heartLoading}
                    error={heartError}
                >
                    <HeartRateChart data={heartDays} />
                </GraphCard>
            </div>
        </>
    )
}

export default LastPerformances