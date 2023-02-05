import "../styles/Movie.css";
// import { useState } from "react";
import { ReactComponent as AddToWatchList } from "../assets/svg/watchList.svg";
import { TMDB_IMG_PATH } from "../services/apiVariables";
import { addToWatchlist } from "../services/marcusApi";

const MovieDescription = ({
  id,
  posterPath,
  title,
  synopsis,
  releasedDate,
}) => {
  return (
    <div className="movie-description">
      <img src={TMDB_IMG_PATH + posterPath} alt={title} />
      <div className="movie-infos">
        <h1>{title}</h1>
        <p>{releasedDate.split("-")[0]}</p>
        <p>{synopsis}</p>
        <AddToWatchList onClick={() => addToWatchlist(id, title, "movie")} />
      </div>
    </div>
  );
};

export default MovieDescription;
