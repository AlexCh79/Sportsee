import './weekStatCard.css'

function WeekStatCard({ label, value, unit, color, paleColor }) {
    return (
        <div className='week-stat-card'>
            <span className='week-stat-label'>{label}</span>
            <p className='week-stat-subtitle'>
                <span className='week-stat-value' style={{ color }}>{value}</span>
                <span style={{color: paleColor}}> {unit}</span>
            </p>
        </div>
    )
}

export default WeekStatCard