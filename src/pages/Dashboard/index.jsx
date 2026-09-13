import Context from '../../context/Context'
import { useContext, useMemo, useState } from 'react'
import { getWeeklyDistance, formatLongDate } from '../../utils/activityStats';
import DistanceChart from '../../components/Charts/DistanceChart';
import './dashboard.css'

function Dashboard() {

    // Récupération des données utilisateur
    const { user, activity } = useContext(Context);
    const [weekOffset, setWeekOffset] = useState(0)

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
                    <div className='stat-km'>
                        <div className='title-graph'>
                            <div className='period-selector'>
                                <h4 className='title-graph-km'>{String(averageDistance).replace('.',',')}km en moyenne</h4>
                                <button 
                                    className='period-nav-btn' 
                                    onClick={() => setWeekOffset((prev) => prev + 1)}
                                    disabled={!distanceStats.canGoPrevious}
                                    aria-label='période précédente'
                                >
                                    <img src='/left_arrow.png' className='arrow'/>
                                </button>
                                <span>
                                    {distanceStats.periodStart && distanceStats.periodEnd ? `${formatLongDate(distanceStats.periodStart)} - ${formatLongDate(distanceStats.periodEnd)}` : ''}
                                </span>
                                <button
                                    className='period-nav-btn'
                                    onClick={() => setWeekOffset((prev) => Math.max(prev -1,0))}
                                    disabled={!distanceStats.canGoNext}
                                    aria-label='période suivante'
                                >
                                    <img src='/right_arrow.png' className='arrow'/>
                                </button>
                            </div>
                            <span className='legend-graph'>Total des kilomètres 4 dernières semaines</span>
                        </div>
                        <DistanceChart data={distanceStats.weeks}/>
                    </div>
                </div>

                <h4 className='perform-title'>Cette semaine</h4>
                <span className='week'>du  au  </span>
            </div>



        </div>
    )
}

export default Dashboard