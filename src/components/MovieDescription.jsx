import "../styles/Movie.css";
// import { useState } from "react";
import { ReactComponent as AddToWatchList } from "../assets/svg/watchList.svg";
import { TMDB_IMG_PATH } from "../services/apiVariables";

const MovieDescription = ({
  id,
  posterPath,
  title,
  synopsis,
  releasedDate,
  addToWatchlist,
}) => {
  return (
    <div className="movie-description">
      <img src={TMDB_IMG_PATH + posterPath} alt={title} />
      <div className="movie-infos">
        <h1>{title}</h1>
        <p>{releasedDate.split("-")[0]}</p>
        <p>{synopsis}</p>
        <AddToWatchList onClick={() => addToWatchlist(id, title)} />
      </div>
    </div>
  );
};

export default MovieDescription;
