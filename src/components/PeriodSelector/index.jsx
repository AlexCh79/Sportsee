import './periodSelector.css'

// Affichage d'un sélecteur de date avec des boutons type arrows

function PeriodSelector ({label, onPrevious, onNext, canGoPrevious, canGoNext}) {
    return (
        <div className='period-selector'>
            <button 
                className='period-nav-btn'
                onClick={onPrevious}
                disabled={!canGoPrevious}
                aria-label='Période précédente'
            >
                <img src='/left_arrow.png' className='arrow' alt='' />
            </button>
            <span>{label}</span>
            <button 
                className='period-nav-btn'
                onClick={onNext}
                disabled={!canGoNext}
                aria-label='Période suivante'
            >
                <img src='/right_arrow.png' className='arrow' alt='' />
            </button>
        </div>
    )
}

export default PeriodSelector