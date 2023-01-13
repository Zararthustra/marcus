import React from 'react';
import UserData from './UserData';
import '../styles/UserDatas.css';

const UserDatas = ({data}) => {
    return (
        <section className="userDatas">
            <UserData data="critic" value={data.critic} />
            <UserData data="note" value={data.note} />
            <UserData data="masterpiece" value={data.masterpiece} />
            <UserData data="watchlist" value={data.watchlist} />
        </section>
    )
}

export default UserDatas;