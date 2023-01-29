import "../styles/Movie.css";
// import { useState } from "react";
import { ReactComponent as AddToWatchList } from "../assets/svg/watchList.svg";

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
      <img
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
      />
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
