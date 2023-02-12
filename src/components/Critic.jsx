import { useState, React } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/info.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/addWatchList.svg";

import Movie from "./Movie";

import "../styles/Critic.css";
import { addToWatchlists } from "../services/marcusApi";
import Stars from "./Stars";
import { useMutation, useQueryClient } from "react-query";

const Critic = ({
  movieId,
  movieName,
  content,
  userId,
  userName,
  currentPage,
  vote,
  platform,
  setTriggerToast,
}) => {
  const [showMovie, setShowMovie] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: mutateWatchlist } = useMutation(
    () => addToWatchlists(movieId, movieName, platform),
    {
      onSuccess: () => {
        setTriggerToast({
          type: "success",
          message: movieName + " ajouté à votre watchlist !",
        });
        queryClient.invalidateQueries(["watchlists"]);
      },
      onError: (err) => {
        if (err.response.status === 400)
          return setTriggerToast({
            type: "error",
            message: "Ce film fait déjà partie de votre watchlist !",
          });
        if (err.response.status === 401)
          return setTriggerToast({
            type: "error",
            message: "Vous devez être connecté pour effectuer cette action.",
          });
        else
          return setTriggerToast({
            type: "error",
            message: "Une erreur est survenue : " + err,
          });
      },
    }
  );

  return (
    <>
      {showMovie && (
        <Movie
          movieId={movieId}
          setShowMovie={setShowMovie}
          platform={platform}
        />
      )}
      <article className="critic">
        <header className="critic-header">
          {currentPage === "movie" ? (
            <h2 className="critic-header-title">
              <a href={`/profil/${userId}`}>{userName}</a>
            </h2>
          ) : (
            <h2
              className="critic-header-title"
              onClick={() => setShowMovie(true)}
            >
              {movieName}
            </h2>
          )}
        </header>
        <main className="critic-main">
          <p className="critic-main-content">{content}</p>
        </main>
        <footer className="critic-footer">
          {currentPage === "movie" ? (
            <Stars value={vote} displayOnly={true} />
          ) : (
            <>
              {currentPage === "profil" ? (
                ""
              ) : (
                <p className="critic-footer-userName">
                  <a href={`/profil/${userId}`}>{userName}</a>
                </p>
              )}
              <div className="critic-footer-icons">
                <CriticWatchList onClick={mutateWatchlist} />
                <CriticInfo onClick={() => setShowMovie(true)} />
              </div>
            </>
          )}
        </footer>
      </article>
    </>
  );
};

export default Critic;
