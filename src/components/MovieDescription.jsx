import "../styles/Movie.css";
// import { useState } from "react";

const MovieDescription = ({
  posterPath,
  id,
  title,
  synopsis,
  releasedDate,
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
      </div>
    </div>
  );
};

export default MovieDescription;
