import "../styles/Movie.css";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as Close } from "../assets/svg/close.svg";
import { ReactComponent as Clap } from "../assets/svg/clap.svg";

import { getMovieById, getTvById } from "../services/tmdbApi";
import {
  addToCritics,
  addToVotes,
  getCritics,
  getCriticsVotes,
  getVotes,
} from "../services/marcusApi";
import { TMDB_IMG_PATH } from "../services/apiVariables";
import { getLocalStorage } from "../utils/localStorage";

import Stars from "./Stars";
import Critic from "./Critic";
import Toast from "./Toast";
import Providers from "./Providers";
import MovieDescription from "./MovieDescription";

const Movie = ({ movieId, setShowMovie, platform }) => {
  //___________________________________________________________ React Query

  const userId = getLocalStorage("userid");
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(["getMovie", movieId], () =>
    platform === "movie" ? getMovieById(movieId) : getTvById(movieId)
  );
  const { data: votes } = useQuery(["votes", userId], () => getVotes(userId));
  const { data: critics } = useQuery(["critics", userId], () =>
    getCritics(userId)
  );
  const { data: criticsVotes, status: criticsVotesStatus } = useQuery(
    ["critics", "votes", movieId],
    () => getCriticsVotes(movieId)
  );

  // Add critic
  const { mutate: addCritic } = useMutation(
    async (e) => {
      e.preventDefault();
      const movie = platform === "movie" ? data.data.title : data.data.name;
      await addToCritics(movieId, movie, criticContent, platform);
    },
    {
      onSuccess: () => {
        setTriggerToast({
          type: "success",
          message: "Merci pour votre avis !",
        });
        setCriticSent(true);
        queryClient.invalidateQueries(["critics"]);
      },
      onError: (err) => {
        if (err.response.status === 400)
          setTriggerToast({
            type: "error",
            message: "Erreur: " + err,
          });
        if (err.response.status === 401)
          setTriggerToast({
            type: "error",
            message: "Vous devez être connecté pour effectuer cette action.",
          });
        else
          setTriggerToast({
            type: "error",
            message: "Une erreur est survenue : " + err,
          });
      },
    }
  );

  // Add vote
  const { mutate: addVote } = useMutation(
    async () => {
      if (voteValue === 0) return;
      const movie = platform === "movie" ? data.data.title : data.data.name;
      await addToVotes(movieId, movie, voteValue, platform);
    },
    {
      onSuccess: () => {
        if (voteValue === 0)
          return setTriggerToast({
            type: "error",
            message: "Si nul que ça ? La note minimale est 1 !",
          });
        setTriggerToast({
          type: "success",
          message: "À voté !",
        });
        setVoteSent(true);
        queryClient.invalidateQueries(["critics"]);
        queryClient.invalidateQueries(["votes"]);
      },
      onError: (err) => {
        if (err.response.status === 400)
          setTriggerToast({
            type: "error",
            message: "Erreur: " + err,
          });
        if (err.response.status === 401)
          setTriggerToast({
            type: "error",
            message: "Vous devez être connecté pour effectuer cette action.",
          });
        else
          setTriggerToast({
            type: "error",
            message: "Une erreur est survenue : " + err,
          });
      },
    }
  );

  //___________________________________________________________ Variables

  const [triggerToast, setTriggerToast] = useState(false);
  const [voteValue, setVoteValue] = useState(0);
  const [criticContent, setCriticContent] = useState("");
  const [voteSent, setVoteSent] = useState(false);
  const [criticSent, setCriticSent] = useState(false);

  //___________________________________________________________ Functions

  // Default do not show inputs if user has already voted or criticized
  useEffect(() => {
    console.log("yo");
    setVoteSent(votes?.data.data.some((item) => item.movie_id === movieId));
    setCriticSent(critics?.data.data.some((item) => item.movie_id === movieId));
  }, [movieId, votes, critics]);

  const handleChange = (e) => {
    if (e.target.value.length > 1000) return;
    return setCriticContent(e.target.value);
  };

  //___________________________________________________________ Render

  if (isLoading)
    return (
      <div className="movie-page">
        <div className="movie">
          <Clap className="loader" />
        </div>
      </div>
    );
  else if (error)
    return (
      <div className="movie-page">
        <div className="movie">Une erreur est survenue...</div>
      </div>
    );

  return (
    <div className="movie-page">
      {triggerToast && (
        <Toast
          type={triggerToast.type}
          message={triggerToast.message}
          setTriggerToast={setTriggerToast}
        />
      )}
      <div className="movie">
        <header className="movie-header">
          <Close onClick={() => setShowMovie(false)} />
        </header>
        {data?.data.backdrop_path && (
          <img
            className="backdrop-img"
            src={TMDB_IMG_PATH + data?.data.backdrop_path}
            alt={platform === "movie" ? data.data.title : data.data.name}
          />
        )}
        <MovieDescription
          posterPath={data?.data.poster_path}
          id={data.data.id}
          title={platform === "movie" ? data.data.title : data.data.name}
          synopsis={data.data.overview}
          releasedDate={
            platform === "movie"
              ? data?.data.release_date
              : data?.data.first_air_date
          }
          actors={data?.data.credits.cast}
          crew={data?.data.credits.crew}
          platform={platform}
          setTriggerToast={setTriggerToast}
        />

        {data?.data.videos?.results.length > 0 && (
          <div className="movie-trailer">
            <iframe
              src={`https://www.youtube.com/embed/${data?.data.videos.results[0].key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {data?.data["watch/providers"].results.FR && (
          <Providers providers={data?.data["watch/providers"].results.FR} />
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
              <label htmlFor="criticContent">
                {criticsVotes?.data.data.length > 0
                  ? "Donnez votre avis !"
                  : "Soyez le premier à donner un avis !"}
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

        {criticsVotes?.data.data.length > 0 &&
          (criticsVotesStatus === "error" ? (
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
                  setTriggerToast={setTriggerToast}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movie;
