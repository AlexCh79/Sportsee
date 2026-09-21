import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Line } from "recharts";
import { useState } from "react";
import ChartLegend from "../ChartLegend";
import './heartRateChart.css'

// Définition des légendes
const LEGEND_LABELS = {
    min: 'Min',
    max: 'Max BPM',
    average: 'Moyenne',
}

function HeartRateChart({data}) {

    const [isHovered, setIsHovered] = useState(false)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} barGap={4} barCategoryGap="25%" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <CartesianGrid vertical={false} horizontal={true} stroke="#E0E0E0" strokeDasharray="3 3" />
                <XAxis 
                    dataKey="day"
                    axisLine={{stroke: '#DEDEDE'}}
                    tickLine={false}
                    tick={{fontSize: 12, fill:'#707070'}}
                />
                <YAxis 
                    domain={[
                        (dataMin) => Math.floor((dataMin - 5) / 5) * 5,
                        (dataMax) => Math.ceil((dataMax + 5) / 5) * 5
                    ]}
                    axisLine={false}
                    width={30}
                    tickLine={false}
                    tick={{fontSize: 12, fill: '#707070'}}
                />
                <Legend content={<ChartLegend labels={LEGEND_LABELS} />} />
                <Bar dataKey="min" name="min" fill="#FCC1B6" barSize={14} radius={30} />            
                <Bar dataKey="max" name="max" fill="#F4320B" barSize={14} radius={30} /> 
                <Line
                    type="monotone"
                    dataKey="average"
                    name="average"
                    stroke={isHovered ? "#0B23F4" : "#F2F3FF"}
                    strokeWidth={2}
                    dot={{r: 4, fill: '#0B23F4', strokeWidth:0 }}
                    connectNulls
                    isAnimationActive={false}
                />           
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default HeartRateChart