import { useContext } from 'react'
import Context from '../../context/Context'
import './profileCard.css'

function formatHeight(heightInCm) {
    const meters = Math.floor(heightInCm / 100)
    const centimeters = heightInCm % 100
    return `${meters}m${String(centimeters).padStart(2, '0')}`
}

function ProfileCard() {

    const { user } = useContext(Context)

    if(!user) {
        return null
    }

    const { age, gender, height, weight } = user.profile

    return (
        <div className='profile-card'>
            <h4 className='profile-card-title'>Votre profil</h4>
            <ul className='profil-card-list'>
                <li className='age'>Âge : {age} ans</li>
                <li className='gender'>Genre : {gender}</li>
                <li className='height'>Taille : {formatHeight(height)}</li>
                <li className='weight'>Poids : {weight}kg</li>
            </ul>
        </div>
    )
}

export default ProfileCard