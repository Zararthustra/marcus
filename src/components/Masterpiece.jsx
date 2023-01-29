import React, { useState } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/info.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/watchList.svg";

import Movie from "./Movie";

import "../styles/Masterpiece.css";
import { addToWatchlist } from "../services/marcusApi";

const Masterpiece = ({
  movieName,
  movieId,
  releasedDate,
  description,
  userName,
  userId,
  poster,
}) => {
  // const [triggerToast, setTriggerToast] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  return (
    <>
      {showMovie && <Movie movieId={movieId} setShowMovie={setShowMovie} />}
      <article className="masterpiece">
        <div className="masterpiece-left">
          <img
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            alt={movieName}
          />
        </div>
        <div className="masterpiece-right">
          <header>
            <h2
              onClick={() => setShowMovie(true)}
              className="masterpiece-title"
            >
              {movieName}
            </h2>
          </header>
          <main>
            <div className="masterpiece-release-director">
              <p>{releasedDate}</p>
            </div>
            <p className="masterpiece-description">{description}</p>
          </main>
          <footer className="masterpiece-footer">
            <p className="masterpiece-footer-userName">
              <a href={`/users/${userId}`}>{userName}</a>
            </p>
            <div className="masterpiece-footer-icons">
              <CriticWatchList onClick={() => addToWatchlist(movieId, movieName)} />
              <CriticInfo onClick={() => setShowMovie(true)} />
            </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default Masterpiece;
