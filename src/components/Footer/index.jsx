import './footer.css'
import AnimatedLogo from '../AnimatedLogo';

function Footer() {
    return (    
        <footer>
            <div className="left-footer">
                <span>&copy;Sportsee</span>
                <span>Tous droits réservés</span>
            </div>
            <div className="right-footer">
                <span>Conditions générales</span>
                <span>Contact</span>
                <AnimatedLogo />
            </div>
        </footer>
    );
}

export default Footer