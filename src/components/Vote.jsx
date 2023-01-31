import "../styles/Vote.css";
import { useState } from "react";
import { ReactComponent as Info } from "../assets/svg/info.svg";
import { ReactComponent as WatchList } from "../assets/svg/watchList.svg";
import Movie from "./Movie";
import { addToWatchlist } from "../services/marcusApi";
import Stars from "./Stars";

const Vote = ({ movieName, movieId, value, userName, userId }) => {
  // const [showLogin, setShowLogin] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  return (
    <>
      {showMovie && <Movie movieId={movieId} setShowMovie={setShowMovie} />}
      <div className="vote">
        <div onClick={() => setShowMovie(true)}>{movieName}</div>
        <Stars value={value} displayOnly={true} />
        <a href={`/profil/${userId}`}>{userName}</a>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <WatchList onClick={() => addToWatchlist(movieId, movieName)} />
          <Info onClick={() => setShowMovie(true)} />
        </div>
      </div>
    </>
  );
};

export default Vote;
