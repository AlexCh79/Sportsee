import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Line } from "recharts";
import ChartLegend from "../ChartLegend";
import './heartRateChart.css'

// Définition des légendes
const LEGEND_LABELS = {
    min: 'Min',
    max: 'Max BPM',
    average: 'Moyenne',
}

function HeartRateChart({data}) {

    return (
        <ResponsiveContainer width="100%" height="100%" className="heart-rate-chart">
            <ComposedChart data={data} barGap={4} barCategoryGap="25%">
                <CartesianGrid vertical={false} horizontal={true} stroke="#E0E0E0" strokeDasharray="3 3" />
                <XAxis 
                    dataKey="day"
                    axisLine={{stroke: '#717171'}}
                    tickLine={false}
                    tick={{fontSize: 12, fill:'#707070'}}
                />
                <YAxis 
                    domain={[
                        (dataMin) => Math.floor((dataMin - 5) / 5) * 5,
                        (dataMax) => Math.ceil((dataMax + 5) / 5) * 5
                    ]}
                    axisLine={{ stroke: '#717171' }}
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
                    stroke="#0B23F4"
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