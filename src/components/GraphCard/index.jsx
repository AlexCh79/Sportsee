import PeriodSelector from '../PeriodSelector'
import './graphCard.css'

function GraphCard({ headerValue, headerColor, subtitle, periodLabel, onPrevious, onNext, canGoNext, canGoPrevious, isLoading ,children }) {
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
            {isLoading && <p className="chart-card-status">Chargement des données...</p>}
            {error && <p className="chart-card-status chart-card-error">{error}</p>}
            {!isLoading && !error && children}        </div>
    )
}

export default GraphCard