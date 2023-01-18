import React from 'react';
import UserData from './UserData';
import '../styles/UserDatas.css';

const UserDatas = ({ data }) => {
    return (
        <section className="userDatas">
            {data.critic.status === 'success' ? (
                <UserData data="critic" value={data.critic.data} />
            ) : (
                <p>Loading critics...</p>
            )}
            {data.note.status === 'success' ? (
                <UserData data="note" value={data.note.data} />
            ) : (
                <p>Loading votes...</p>
            )}
            {data.masterpiece.status === 'success' ? (
                <UserData data="masterpiece" value={data.masterpiece.data} />
            ) : (
                <p>Loading masterpieces...</p>
            )}
            {data.watchlist.status === 'success' ? (
                <UserData data="watchlist" value={data.watchlist.data} />
            ) : (
                <p>Loading watchlists...</p>
            )}
        </section>
    )
}

export default UserDatas;