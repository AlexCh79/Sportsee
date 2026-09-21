import './animatedLogo.css'

// Position de chaque barre : x, haut de la partie rouge, sa hauteur,
// et la distance de descente pour atteindre "state 2"
const BARS = [
    { x: 0,  y: 3, height: 11, shift: 5 },
    { x: 4,  y: 0, height: 14, shift: 7 },
    { x: 8,  y: 2, height: 12, shift: 3 },
    { x: 12, y: 5, height: 9,  shift: 6 },
    { x: 16, y: 0, height: 14, shift: 4 },
]

function AnimatedLogo() {
    return (
        <svg className='animated-logo' width='19' height='21' viewBox='0 0 19 21' aria-hidden='true'>
            <defs>
                <linearGradient id='logo-red' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='#F99582' />
                    <stop offset='100%' stopColor='#E03C2E' />
                </linearGradient>
            </defs>
            {BARS.map((bar) => (
                <g key={bar.x}>
                    <rect x={bar.x} y={13} width={3} height={bar.shift + 1} rx={1.5} fill='#5F60E5' />
                    <rect
                        className='logo-bar'
                        x={bar.x}
                        y={bar.y}
                        width={3}
                        height={bar.height}
                        rx={1.5}
                        fill='url(#logo-red)'
                        style={{ '--shift': `${bar.shift}px` }}
                    />
                </g>
            ))}
        </svg>
    )
}

export default AnimatedLogo