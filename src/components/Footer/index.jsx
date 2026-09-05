import './footer.css'

function Footer() {
    return (
        <footer>
            <ul className="footer-left">
                <li>&copy; Sportsee</li>
                <li>Tous droits réservés</li>
            </ul>
            <ul className="footer-right">
                <li>Conditions générales</li>
                <li>Contact</li>
                <li><img src="/icon_default.png" alt="Default Icon" className="footer-icon" /></li>
            </ul>        
        </footer>
    )
}
export default Footer