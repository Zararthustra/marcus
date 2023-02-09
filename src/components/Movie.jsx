import "../styles/Movie.css";

import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as Close } from "../assets/svg/close.svg";
import Stars from "./Stars";

import { getMovieById } from "../services/tmdbApi";
import { getCritics, getCriticsVotes, getVotes } from "../services/marcusApi";
import { MARCUS_BASE_PATH } from "../services/apiVariables";
import { getLocalStorage } from "../utils/localStorage";

import Critic from "./Critic";
import MovieDescription from "./MovieDescription";

const Movie = ({ movieId, setShowMovie, platform }) => {
  //___________________________________________________________ React Query

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(["getMovie", movieId], () =>
    getMovieById(movieId)
  );
  // console.log("🚀 ~ file: Movie.jsx:22 ~ Movie ~ data", data)
  const { data: critics } = useQuery(["critics"], () => getCritics());
  const { data: criticsVotes, status: criticsVotesStatus } = useQuery(
    ["critics", "votes", movieId],
    () => getCriticsVotes(movieId)
  );
  const { data: votes } = useQuery(["votes"], () => getVotes());

  // Add critic
  const { mutate: addCritic } = useMutation(
    async (e) => {
      e.preventDefault();

      await axios.post(
        `${MARCUS_BASE_PATH}/critics`,
        {
          movie_id: data.data.id,
          movie_name: data.data.title,
          content: criticContent,
          platform: platform,
        },
        { headers: { authorization: "Bearer " + getLocalStorage("access") } }
      );
    },
    {
      onSuccess: () => {
        setCriticSent(true);
        queryClient.invalidateQueries(["critics"]); // Trigger toast here
      },
      onError: (err) => console.log(err), // Trigger toast here
    }
  );

  // Add vote
  const { mutate: addVote } = useMutation(
    async () => {
      if (voteValue === 0) return console.log("olala"); // toast here
      await axios.post(
        `${MARCUS_BASE_PATH}/votes`,
        {
          movie_id: data.data.id,
          movie_name: data.data.title,
          value: voteValue,
          platform: platform,
        },
        { headers: { authorization: "Bearer " + getLocalStorage("access") } }
      );
    },
    {
      onSuccess: () => {
        setVoteSent(true);
        queryClient.invalidateQueries(["critics"]); // Trigger toast here
        queryClient.invalidateQueries(["votes"]); // Trigger toast here
      },
      onError: (err) => console.log(err), // Trigger toast here
    }
  );

  //___________________________________________________________ Variables

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
        <header className="movie-header">
          <Close onClick={() => setShowMovie(false)} />
        </header>
        <MovieDescription
          posterPath={data?.data.poster_path}
          id={data.data.id}
          title={data.data.title}
          synopsis={data.data.overview}
          releasedDate={data.data.release_date}
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
            <div className="button-primary" onClick={addVote}>
              Voter
            </div>
          </div>
        )}

        {!criticSent && (
          <form onSubmit={addCritic}>
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

        {criticsVotesStatus === "error" ? (
          <div>Error</div>
        ) : (
          <div className="movie-critics">
            <h1>Notes & Critiques</h1>
            {criticsVotes?.data.data.map((critic, index) => (
              <Critic
                key={index}
                movieId={critic.movie_id}
                movieName={critic.movie_name}
                content={critic.content}
                userId={critic.user_id}
                userName={critic.user_name}
                currentPage="movie"
                vote={critic.vote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
