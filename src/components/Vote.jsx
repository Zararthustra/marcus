import "../styles/Vote.css";
import { useState } from "react";
import { ReactComponent as Info } from "../assets/svg/info.svg";
import { ReactComponent as WatchList } from "../assets/svg/watchList.svg";
import Movie from "./Movie";
import { addToWatchlist } from "../services/marcusApi";
import Stars from "./Stars";

const Vote = ({
  movieName,
  movieId,
  value,
  userName,
  userId,
  currentPage,
  platform,
}) => {
  // const [showLogin, setShowLogin] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  return (
    <>
      {showMovie && <Movie movieId={movieId} setShowMovie={setShowMovie} />}
      <div className="vote">
        <div onClick={() => setShowMovie(true)}>{movieName}</div>
        <Stars value={value} displayOnly={true} />
        {currentPage === "profil" ? (
          ""
        ) : (
          <a href={`/profil/${userId}`}>{userName}</a>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <WatchList
            onClick={() => addToWatchlist(movieId, movieName, platform)}
          />
          <Info onClick={() => setShowMovie(true)} />
        </div>
      </div>
    </>
  );
};

export default Vote;
