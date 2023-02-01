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
        <img
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          alt={movieName}
        />
        <div className="masterpiece-right">
          <h2 onClick={() => setShowMovie(true)} className="masterpiece-title">
            {movieName}
          </h2>
          <p className="masterpiece-director">{releasedDate}</p>
          <p className="masterpiece-description">{description}</p>
          <footer className="masterpiece-footer">
            <p className="masterpiece-footer-userName">
              <a href={`/profil/${userId}`}>{userName}</a>
            </p>
            <div className="masterpiece-footer-icons">
              <CriticWatchList
                onClick={() => addToWatchlist(movieId, movieName)}
              />
              <CriticInfo onClick={() => setShowMovie(true)} />
            </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default Masterpiece;
