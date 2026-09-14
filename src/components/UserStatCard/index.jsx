import './userStatCard.css'

function UserStatCard({ title, value, unit }) {
    return (
        <div className='stats-card'>
            <span className='stats-card-title'>{title}</span>
            <div className='stats-card-result'>
                <span className='stats-card-value'>{value}</span>
                <span className='stats-card-unit'>{unit}</span>
            </div>
        </div>
    )
}

export default UserStatCard