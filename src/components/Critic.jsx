import { useState, React } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/info.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/watchList.svg";

import Movie from "./Movie";

import "../styles/Critic.css";
import { addToWatchlist } from "../services/marcusApi";

const Critic = ({
  movieId,
  movieName,
  content,
  userId,
  userName,
  currentPage,
  vote,
}) => {
  // const [triggerToast, setTriggerToast] = useState(false);
  const [showMovie, setShowMovie] = useState(false);


  return (
    <>
      {showMovie && <Movie movieId={movieId} setShowMovie={setShowMovie} />}
      <article className="critic">
        <header className="critic-header">
          <h2
            className="critic-header-title"
            onClick={() => setShowMovie(true)}
          >
            {currentPage === "movie" ? userName : movieName}
          </h2>
        </header>
        <main className="critic-main">
          <p className="critic-main-content">{content}</p>
        </main>
        <footer className="critic-footer">
          {currentPage === "movie" ? (
            <div>{vote}</div>
          ) : (
            <>
              <p className="critic-footer-userName">
                <a href={`/profil/${userId}`}>{userName}</a>
              </p>
              <div className="critic-footer-icons">
                <CriticWatchList onClick={() => addToWatchlist(movieId, movieName)} />
                <CriticInfo onClick={() => setShowMovie(true)} />
              </div>
            </>
          )}
        </footer>
      </article>
    </>
  );
};

export default Critic;
