import './profileCard.css'

function ProfileCard() {
    return (
        <div className='profile-card'>
            <h4 className='profile-card-title'>Votre profil</h4>
            <ul className='profil-card-list'>
                <li className='age'>Âge : 22 ans</li>
                <li className='gender'>Genre : Femme</li>
                <li className='height'>Taille : 1m68</li>
                <li className='weight'>Poids : 58kg</li>
            </ul>
        </div>
    )
}

export default ProfileCard