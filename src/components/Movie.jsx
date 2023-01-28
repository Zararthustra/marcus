import "../styles/Movie.css";
// import { useState } from "react";
import { useQuery } from "react-query";
import { getMovieById } from "../services/tmdbApi";

const Movie = ({ movieId }) => {
  const { data, isLoading, error } = useQuery(["getMovie"], () =>
    getMovieById(movieId)
  );

  if (isLoading)
    return (
      <div className="movie-page">
        <div className="movie">Movie loading</div>
      </div>
    );

  else if (error)
    return (
      <div className="movie-page">
        <div className="movie">Movie error</div>
      </div>
    );

  return (
    <div className="movie-page">
      <div className="movie">
        <div>id: {data.data.id}</div>
        <div>original_title: {data.data.original_title}</div>
        <div>title: {data.data.title}</div>
        <div>overview: {data.data.overview}</div>
        <div>poster_path: {data.data.poster_path}</div>
        <div>release_date: {data.data.release_date}</div>
        <div>tagline: {data.data.tagline}</div>
      </div>
    </div>
  );
};

export default Movie;
