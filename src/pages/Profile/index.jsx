import UserCard from '../../components/UserCard'
import ProfileCard from '../../components/ProfileCard'
import UserStats from '../../components/userStats'
import Context from '../../context/Context'
import { useContext } from 'react'
import './profile.css'

function Profile() {

    const { user, activity } = useContext(Context)

    return (
        <div className='profile'>
            <div className='profile-container'>
                <div className='left-section'>
                    <UserCard />
                    <ProfileCard />
                </div>
                <UserStats />
            </div>
        </div>
    )
}

export default Profile