import { useState, React } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/criticInfo.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/criticWatchList.svg";

import Movie from "./Movie";

import "../styles/Critic.css";

const Critic = ({ movieId, movieName, content, userId, userName }) => {
  const [triggerToast, setTriggerToast] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  return (
    <>
      {showMovie && <Movie movieId={movieId}/>}
      <article className="critic">
        <header className="critic-header">
          <h2
            className="critic-header-title"
            onClick={() => setShowMovie(true)}
          >
            {movieName}
          </h2>
        </header>
        <main className="critic-main">
          <p className="critic-main-content">{content}</p>
        </main>
        <footer className="critic-footer">
          <p className="critic-footer-userName">
            <a href={`/users/${userId}`}>{userName}</a>
          </p>
          <div className="critic-footer-icons">
            <CriticWatchList onClick={() => setTriggerToast(!triggerToast)} />
            {triggerToast && <p message={`Added ${movieName} to watchlist`} />}
            <a href={`/movies/${movieId}`}>
              <CriticInfo />
            </a>
          </div>
        </footer>
      </article>
    </>
  );
};

export default Critic;
