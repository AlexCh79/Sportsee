import './footer.css'

function Footer() {
    return (    
        <footer>
            <div className="left-footer">
                <span>&copy; Sportsee</span>
                <span>Tous droits réservés</span>
            </div>
            <div className="right-footer">
                <span>Conditions générales</span>
                <span>Contact</span>
                <img src="/favicon.png" alt="" className="icon" />
            </div>
        </footer>
    );
}

export default Footer