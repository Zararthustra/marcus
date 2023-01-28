import "../styles/Movie.css";
// import { useState } from "react";
import { useQuery } from "react-query";
import { getMovieById } from "../services/tmdbApi";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import MovieDescription from "./MovieDescription";
import { getCritics } from "../services/marcusApi";
import Critic from "./Critic";

const Movie = ({ movieId, setShowMovie }) => {
  const { data, isLoading, error } = useQuery(["getMovie"], () =>
    getMovieById(movieId)
  );
  const { data: critics, status: criticsStatus } = useQuery("critics", () =>
    getCritics()
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
        <Close
          onClick={() => setShowMovie(false)}
          style={{
            position: "absolute",
            top: ".7rem",
            right: "1rem",
            cursor: "pointer",
            fill: "black",
          }}
        />
        <MovieDescription
          posterPath={data?.data.poster_path}
          id={data.data.id}
          title={data.data.title}
          synopsis={data.data.overview}
          releasedDate={data.data.release_date}
        />
        {criticsStatus === "error" ? (
          <div>Error</div>
        ) : (
          <div className="movie-critics">
            <h1>Notes & Critiques</h1>
            {critics.data.data.map((critic, index) => (
              <Critic
                key={index}
                movieId={critic.movie_id}
                movieName={critic.movie_name}
                content={critic.content}
                userId={critic.user_id}
                userName={critic.user_name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
