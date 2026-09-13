import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './distanceChart.css'

// Création du Tooltip
function CustomTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) {
        return null
    }

    const { dateRange, km } = payload[0].payload

    return (
        <div className="distance-tooltip">
            <p className="distance-tooltip-range">{dateRange}</p>
            <p className="distance-tooltip-value">{String(km).replace('.', ',')} km</p>
        </div>
    )
}

// Graphique des distances pour le tableau de bord

function DistanceChart({data}) {
    return (
        <ResponsiveContainer width="100%" height={307}>
            <BarChart data={data} barSize={14}>
                <CartesianGrid
                    vertical={false}
                    horizontal={true}
                    stroke="#E0E0E0"
                    strokeDasharray="3 3"
                />
                <XAxis
                    dataKey="week"
                    axisLine={{ stroke: '#717171' }}
                    tickLine={false}
                    tick={{fontSize: 12, fill: '#707070'}}
                />
                <YAxis
                    domain={[0, (dataMax) => Math.ceil((dataMax + 1) / 10) * 10]}
                    axisLine={{ stroke: '#717171' }}
                    tickLine={false}
                    tick={{fontSize: 10, fill: '#707070'}}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Legend 
                    iconType="circle"
                    formatter={() => 'Km'}
                    align="left"
                />
                <Bar dataKey="km" name="Km" fill="#B6BDFC" radius={4} activeBar={{fill: "#0B23F4"}} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DistanceChart