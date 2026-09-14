import PeriodSelector from '../PeriodSelector'
import './graphCard.css'

function GraphCard({ headerValue, headerColor, subtitle, periodLabel, onPrevious, onNext, canGoNext, canGoPrevious, children }) {
    return (
        <div className='graph_card'>
            <div className='graph-card-header'>
                {headerValue && (
                    <h4 className='graph-card-value' style={{color: headerColor}}>{headerValue}</h4>
                )}
                {periodLabel !== undefined && (
                    <PeriodSelector
                        label={periodLabel}
                        onPrevious={onPrevious}
                        onNext={onNext}
                        canGoPrevious={canGoPrevious}
                        canGoNext={canGoNext}
                    />
                )}
            </div>
            {subtitle && <span className='graph-card-legend'>{subtitle}</span>}
            {children}
        </div>
    )
}

export default GraphCard