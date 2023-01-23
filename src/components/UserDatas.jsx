import React from 'react';
import UserData from './UserData';
import '../styles/UserDatas.css';

const UserDatas = ({ data }) => {
    return (
        <section className="userDatas">
            {data.critic.status === 'loading' ? (
                <p>Loading critics...</p>
            ) : (
                <UserData data="critic" value={data.critic.data} />
            )}
            {data.note.status === 'loading' ? (
                <p>Loading votes...</p>
            ) : (
                <UserData data="note" value={data.note.data} />
            )}
            {data.masterpiece.status === 'loading' ? (
                <p>Loading masterpieces...</p>
            ) : (
                <UserData data="masterpiece" value={data.masterpiece.data} />
            )}
            {data.watchlist.status === 'loading' ? (
                <p>Loading watchlists...</p>
            ) : (
                <UserData data="watchlist" value={data.watchlist.data} />
            )}
        </section>
    )
}

export default UserDatas;