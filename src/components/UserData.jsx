import React from 'react';
import { ReactComponent as Palette } from "../assets/svg/palette.svg";
import { ReactComponent as Critics } from "../assets/svg/critics.svg";
import { ReactComponent as Votes } from "../assets/svg/votes.svg";
import { ReactComponent as WatchList } from "../assets/svg/watchList.svg";
import '../styles/UserData.css';

const UserData = ({ data, value }) => {
    let icon;
    let title;

    switch (data) {
        case 'critic':
            icon = <Critics alt="Critic Icon" className="user-data-icon" />;
            title = 'Critiques';
            break;
        case 'note':
            icon = <Votes alt="Vote Icon" className="user-data-icon" />;
            title = 'Notes';
            break;
        case 'masterpiece':
            icon = <Palette alt="Masterpiece Icon" className="user-data-icon" />;
            title = "Chefs d'oeuvres";
            break;
        case 'watchlist':
            icon = <WatchList alt="Watchlist Icon" className="user-data-icon" />;
            title = 'À regarder';
            break;
        default:
            icon = null;
            title = null;
    };

    return (
        <article className="user-data">
            {icon}
            <span className="user-data-title">{title}</span>
            <span className="user-data-value">{value}</span>
        </article>
    );
}

export default UserData;