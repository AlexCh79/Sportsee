import UserCard from '../../components/UserCard'
import ProfileCard from '../../components/ProfileCard'
import UserStats from '../../components/UserStats'
import './profile.css'

function Profile() {

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