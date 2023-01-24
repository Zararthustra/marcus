import React, { useState } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/criticInfo.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/criticWatchList.svg";
import "../styles/Masterpiece.css";

const Masterpiece = ({
    movieName,
    movieId,
    releasedDate,
    director,
    description,
    userName,
    userId,
    poster,
    }) => {
    const [triggerToast, setTriggerToast] = useState(false);

    return (
        <article className="masterpiece">
        <div className="masterpiece-left">
            <img src={poster} alt={movieName} />
        </div>
        <div className="masterpiece-right">
            <header>
            <a href={`/movie/${movieId}`}>
                <h3 className="masterpiece-title">{movieName}</h3>
            </a>
            </header>
            <main>
            <div className="masterpiece-release-director">
                <p>{releasedDate}</p>
                <p>{director}</p>
            </div>
            <p className="masterpiece-description">{description}</p>
            </main>
            <footer className="masterpiece-footer">
            <p className="masterpiece-footer-userName">
                <a href={`/users/${userId}`}>{userName}</a>
            </p>
            <div className="masterpiece-footer-icons">
                <CriticWatchList onClick={() => setTriggerToast(!triggerToast)} />
                {triggerToast && <p message={`Added ${movieName} to watchlist`} />}
                <a href={`/movies/${movieId}`}>
                <CriticInfo />
                </a>
            </div>
            </footer>
        </div>
        </article>
    );
};

export default Masterpiece;
