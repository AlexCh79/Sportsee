import './userCard.css'

function UserCard() {
    return (
        <div className='user-card'>
            <img src='' alt='Photo de profil' className='profile-photo' />
            <div className='user-info'>
                <h4 className='username'>Prénom NOM</h4>
                <span className='createdDate'>Membre depuis le 01/01/2023</span>
            </div>
        </div>
    )
}

export default UserCard