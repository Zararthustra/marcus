import "../styles/Movie.css";
// import { useState } from "react";
import { useQuery } from "react-query";
import { getMovieById } from "../services/tmdbApi";
import { ReactComponent as Close } from "../assets/svg/close.svg";
import MovieDescription from "./MovieDescription";
import { addToWatchlist, getCritics } from "../services/marcusApi";
import Critic from "./Critic";
import { MARCUS_BASE_PATH } from "../services/apiVariables";
import axios from "axios";
import { useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

const Movie = ({ movieId, setShowMovie }) => {
  const { data, isLoading, error } = useQuery(["getMovie"], () =>
    getMovieById(movieId)
  );
  const { data: critics, status: criticsStatus } = useQuery("critics", () =>
    getCritics()
  );

  const [criticContent, setCriticContent] = useState("");
  // Default do not show textarea if user has already criticized
  const [criticSent, setCriticSent] = useState(
    critics?.data.data.filter(
      (item) =>
        item.movie_id === movieId && item.user_id === getLocalStorage("userid")
    ).length > 0
  );

  const handleChange = (e) => {
    if (e.target.value.length > 1000) return;
    return setCriticContent(e.target.value);
  };
  const handleCritic = (e) => {
    e.preventDefault();

    axios
      .post(
        `${MARCUS_BASE_PATH}/critics`,
        {
          movie_id: data.data.id,
          movie_name: data.data.title,
          content: criticContent,
        },
        { headers: { authorization: "Bearer " + getLocalStorage("access") } }
      )
      .then((user) => {
        console.log(user);
        setCriticSent(true);
      })
      .catch((error) => {
        return console.log(error);
      });
    return;
  };

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
          addToWatchlist={addToWatchlist}
        />

        {!criticSent && (
          <form onSubmit={handleCritic}>
            <div className="inputLabel">
              <label htmlFor="criticContent">
                Que pensez-vous de ce film ?
              </label>
              <textarea
                required
                rows="7"
                type="text"
                value={criticContent}
                onChange={handleChange}
                name="criticContent"
                id="criticContent"
              />
            </div>
            <input type="submit" className="button-primary" value="Critiquer" />
          </form>
        )}

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
                currentPage="movie"
                vote={"* * * *"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
