import Context from '../../context/Context'
import { useContext } from 'react'
import ThisWeek from './sections/ThisWeek';
import LastPerformances from './sections/LastPerformances';
import './dashboard.css'

function Dashboard() {

    // Récupération des données utilisateur
    const { user } = useContext(Context);

    if(!user) {
        return null
    };

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
                    <div className="banner-photo-wrapper">
                        <img src={user.profile.profilePicture} alt='image de profil' className='banner-photo' />
                    </div>
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
                <div>
                    <LastPerformances />
                </div>
                
                <ThisWeek />
            </div>

            

        </div>
    )
}

export default Dashboard