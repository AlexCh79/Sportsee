import UserStatCard from '../UserStatCard'
import './userStats.css'

function UserStats() {
    return (
        <div className='user-stats'>
            <div className='user-stats-row'>
                <h4 className='user-stats-title'>Vos statistiques</h4>
                <span className='user-stats-subtitle'>Depuis le 3 juin 2023</span>
            </div>
            <div className='user-stats-cards'>
                <UserStatCard />
            </div>
        </div>
    )
}

export default UserStats