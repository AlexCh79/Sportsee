import './chartLegend.css'

function ChartLegend({ payload, labels }) {
    if(!payload) return null

    return (
        <ul className='chart-legend'>
            {payload.map((entry) => (
                <li key={entry.value} className='chart-legend-item'>
                    <span className='chart-legend-dot' style={{backgroundColor: entry.color}} />
                    <span>{labels ? labels[entry.value] : entry.value }</span>
                </li>
            ))}
        </ul>
    )
}

export default ChartLegend