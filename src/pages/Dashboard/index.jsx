import Context from '../../context/Context'
import { useContext, useMemo, useState } from 'react'
import { getWeeklyDistance } from '../../utils/activityStats';
import DistanceChart from '../../components/Charts/DistanceChart';
import { formatLongDate } from '../../utils/dateHelpers';
import HeartRateChart from '../../components/Charts/heartRateChart';
import GraphCard from '../../components/GraphCard';
import getDailyHeartRate from '../../utils/heartRateStats';
import ThisWeek from './sections/ThisWeek';
import './dashboard.css'

function Dashboard() {

    console.log('Dashboard render')

    // Récupération des données utilisateur
    const { user, activity } = useContext(Context);
    const [weekOffset, setWeekOffset] = useState(0);
    const [heartWeekOffset, setHeartWeekOffset] = useState(0);

    if(!user) {
        return null
    };

    // Calcul des distances moyennes de l'activité utilisateur
    const distanceStats = useMemo(() => {
        if(!activity) return { weeks: [], periodStart: null, periodEnd: null, canGoPrevious: false, canGoNext: false }
        return getWeeklyDistance(activity.activities, weekOffset)
    }, [activity, weekOffset])

    // Calcul de la distance moyenne sur la période
    const averageDistance = useMemo(() => {
        if(distanceStats.weeks.length === 0) return 0
        const total = distanceStats.weeks.reduce((sum, week) => sum + week.km, 0)
        return Math.round((total / distanceStats.weeks.length) * 10) /10
    }, [distanceStats])

    // Transformation de la date de création en version française
    const memberSince = new Date(user.profile.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    // Récupération des stats de fréquence cardiaque
    const heartRateStats = useMemo(() => {
        if(!activity) return { days: [], periodStart: null, periodEnd: null, canGoPrevious: false, canGoNext: false }
        return getDailyHeartRate(activity.activities, heartWeekOffset)
    }, [activity, heartWeekOffset])

    // Calcul des moyennes de fréquence cardiaque
    const averageBPM = useMemo(() => {
        const validDay = heartRateStats.days.filter((day) => day.average !== null)
        if (validDay.length === 0) return 0
        const total = validDay.reduce((sum, day) => sum + day.average, 0)
        return Math.round(total / validDay.length)
    }, [heartRateStats])

    // Calcul des périodes d'activités
    const distancePeriodLabel = distanceStats.periodStart && distanceStats.periodEnd
        ? `${formatLongDate(distanceStats.periodStart)} - ${formatLongDate(distanceStats.periodEnd)}`
        : ''
    
    const heartRatePeriodLabel = heartRateStats.periodStart && heartRateStats.periodEnd
        ? `${formatLongDate(heartRateStats.periodStart)} - ${formatLongDate(heartRateStats.periodEnd)}`
        : ''

    return (
        <div className='dashboard'>
            <div className='dashboard-card-profile'>
                <div className='left-dashboard-card-profile'>
                    <img src={user.profile.profilePicture} alt='image de profil' className='profile-photo' />
                    <div className='info-profile'>
                        <h4 className='name'>{user.profile.firstName} {user.profile.lastName}</h4>
                        <span className='member-since'>Membre depuis le {memberSince}</span>
                    </div>
                </div>
                <div className='right-dashboard-card-profile'>
                    <span className='distance'>Distance totale parcourue</span>
                    <span className='total-distance'><span className='total-distance-text'><img src='/outline.png' alt='' />{user.statistics.totalDistance} km</span></span>
                </div>
            </div>

            <div className='perform-board'>
                <h4 className='perform-title'>Vos dernières performances</h4>
                <div className='perf-graph'>
                    <GraphCard
                        headerValue={`${String(averageDistance).replace('.',',')} km en moyenne`}
                        headerColor="var(--dark-blue)"
                        subtitle="Total des kilomètres 4 dernières semaines"
                        periodLabel={distancePeriodLabel}
                        onPrevious={() => setWeekOffset((prev) => prev + 1)}
                        onNext={() => setWeekOffset((prev) => Math.max(prev -1,0))}
                        canGoPrevious={distanceStats.canGoPrevious}
                        canGoNext={distanceStats.canGoNext}
                    >
                        <DistanceChart data={distanceStats.weeks} />
                    </GraphCard>
                    <GraphCard
                        headerValue={`${String(averageBPM).replace('.',',')} BPM`}
                        headerColor="#F4320B"
                        subtitle="Fréquence cardiaque moyenne"
                        periodLabel={heartRatePeriodLabel}
                        onPrevious={() => setHeartWeekOffset((prev) => prev + 1)}
                        onNext={() => setHeartWeekOffset((prev) => Math.max(prev -1,0))}
                        canGoPrevious={heartRateStats.canGoPrevious}
                        canGoNext={heartRateStats.canGoNext}                    
                    >
                        <HeartRateChart data={heartRateStats.days} />
                    </GraphCard>
                </div>
                <ThisWeek />
            </div>

            

        </div>
    )
}

export default Dashboard