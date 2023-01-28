import React, { useState } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/criticInfo.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/criticWatchList.svg";

import Movie from "./Movie";

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
  const [showMovie, setShowMovie] = useState(false);

  return (
    <>
      {showMovie && <Movie movieId={movieId} setShowMovie={setShowMovie}/>}
      <article className="masterpiece">
      <div className="masterpiece-left">
        <img src={poster} alt={movieName} />
      </div>
      <div className="masterpiece-right">
        <header>
          <h2 onClick={() => setShowMovie(true)} className="masterpiece-title">
            {movieName}
          </h2>
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
    </>
  );
};

export default Masterpiece;
