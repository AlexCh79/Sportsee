import { PieChart, Pie, Cell } from 'recharts'
import './weeklyGoalChart.css'

const COLORS = {
    completed: '#0B23F4',
    remaining: '#B6BDFC',
}

function renderLabel({ cx, cy, midAngle, outerRadius, name, value }) {
    const RADIAN = Math.PI / 180
    const isRightSide = Math.cos(-midAngle * RADIAN) >= 0

    const dotRadius = outerRadius + 14
    const dotX = cx + dotRadius * Math.cos(-midAngle * RADIAN)
    const dotY = cy + dotRadius * Math.sin(-midAngle * RADIAN)

    const textX = dotX + (isRightSide ? 10 : -10)

    const color = name === 'completed' ? COLORS.completed : COLORS.remaining
    const text = name === 'completed' ? `${value} réalisées` : `${value} restants`

    return (
        <g>
            <circle cx={dotX} cy={dotY} r={3} fill={color} stroke="#FFFFFF" strokeWidth={1} />
            <text
                x={textX}
                y={dotY}
                dy={4}
                fontSize={11}
                fill="#707070"
                textAnchor={isRightSide ? 'start' : 'end'}
            >
                {text}
            </text>
        </g>
    )
}

function WeeklyGoalChart({ completed, goal }) {
    const remaining = Math.max(goal - completed, 0)

    const data = [
        { name: 'completed', value: completed },
        { name: 'remaining', value: remaining },
    ]

    return (
        <PieChart width={320} height={260}>
            <Pie
                data={data}
                dataKey="value"
                cx={160}
                innerRadius={45}
                outerRadius={85}
                startAngle={90}
                endAngle={-270}
                stroke='none'
                label={renderLabel}
                labelLine={false}
            >
                {data.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
            </Pie>
        </PieChart>
    )
}

export default WeeklyGoalChart