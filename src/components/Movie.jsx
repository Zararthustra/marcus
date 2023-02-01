import "../styles/Movie.css";

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

import { ReactComponent as Close } from "../assets/svg/close.svg";
import Stars from "./Stars";

import { getMovieById } from "../services/tmdbApi";
import { addToWatchlist, getCritics, getVotes } from "../services/marcusApi";
import { MARCUS_BASE_PATH } from "../services/apiVariables";
import { getLocalStorage } from "../utils/localStorage";

import Critic from "./Critic";
import MovieDescription from "./MovieDescription";

const Movie = ({ movieId, setShowMovie }) => {
  //___________________________________________________________ Variables

  const { data, isLoading, error } = useQuery(["getMovie"], () =>
    getMovieById(movieId)
  );
  const { data: critics, status: criticsStatus } = useQuery("critics", () =>
    getCritics()
  );
  const { data: votes, status: votesStatus } = useQuery("votes", () =>
    getVotes()
  );

  // User inputs
  const [voteValue, setVoteValue] = useState(0);
  const [criticContent, setCriticContent] = useState("");

  // Default do not show if user has already voted or criticized
  const [voteSent, setVoteSent] = useState(
    votes?.data.data.filter(
      (item) =>
        item.movie_id === movieId && item.user_id === getLocalStorage("userid")
    ).length > 0
  );
  const [criticSent, setCriticSent] = useState(
    critics?.data.data.filter(
      (item) =>
        item.movie_id === movieId && item.user_id === getLocalStorage("userid")
    ).length > 0
  );

  //___________________________________________________________ Functions

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
  const handleVote = () => {
    if (voteValue === 0) return; // toast here
    axios
      .post(
        `${MARCUS_BASE_PATH}/votes`,
        {
          movie_id: data.data.id,
          movie_name: data.data.title,
          value: voteValue,
        },
        { headers: { authorization: "Bearer " + getLocalStorage("access") } }
      )
      .then((user) => {
        console.log(user);
        setVoteSent(true);
      })
      .catch((error) => {
        return console.log(error);
      });
    return;
  };

  //___________________________________________________________ Render

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

        {data?.data.videos.results.length > 0 && (
          <div className="movie-trailer">
            <iframe
              src={`https://www.youtube.com/embed/${data?.data.videos.results[0].key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {!voteSent && (
          <div className="movie-vote">
            <Stars
              displayOnly={false}
              voteValue={voteValue}
              setVoteValue={setVoteValue}
            />
            <div className="button-primary" onClick={handleVote}>
              Voter
            </div>
          </div>
        )}

        {!criticSent && (
          <form onSubmit={handleCritic}>
            <div className="inputLabel">
              <label htmlFor="criticContent">Donnez votre avis !</label>
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
