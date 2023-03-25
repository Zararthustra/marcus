import "../styles/Critic.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as CriticInfo } from "../assets/svg/info.svg";
import { ReactComponent as DelCritic } from "../assets/svg/delCritic.svg";

import { deleteCritic } from "../services/marcusApi";

import Stars from "./Stars";
import Movie from "../views/Movie";

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
  isOwner,
}) => {
  const [showMovie, setShowMovie] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: mutateDelCritic } = useMutation(() => deleteCritic(movieId), {
    onSuccess: () => {
      setTriggerToast({
        type: "success",
        message: "Votre critique a bien été supprimée",
      });
      queryClient.invalidateQueries(["critics"]);
    },
    onError: (err) => {
      if (err.response.status === 404)
        return setTriggerToast({
          type: "error",
          message: "Cette critique n'existe plus !",
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
  });

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
                {isOwner && <DelCritic className="delete-icon" onClick={mutateDelCritic} />}
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
