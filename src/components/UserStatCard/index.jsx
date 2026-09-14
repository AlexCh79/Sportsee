import './userStatCard.css'

function UserStatCard() {
    return (
        <div className='stats-card'>
            <span className='stats-card-title'>Temps total couru</span>
            <div className='stats-card-result'>
                <span className='stats-card-value'>27</span>
                <span className='stats-card-unit'>km</span>
            </div>
        </div>
    )
}

export default UserStatCard