import { useContext } from 'react'
import Context from '../../context/Context'
import { formatFullDate } from '../../utils/dateHelpers'
import './userCard.css'

function UserCard() {

    const { user } = useContext(Context)

    if(!user) {
        return null
    }

    return (
        <div className='user-card'>
            <div className="profile-photo-wrapper">
                <img src={user.profile.profilePicture} alt='Photo de profil' className='profile-photo-card' />
            </div>
            <div className='user-info'>
                <h4 className='username'>{user.profile.firstName} {user.profile.lastName}</h4>
                <span className='createdDate'>Membre depuis le {formatFullDate(new Date(user.profile.createdAt))}</span>
            </div>
        </div>
    )
}

export default UserCard