import "../styles/Masterpiece.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as MovieInfo } from "../assets/svg/info.svg";
import { ReactComponent as DelMasterpiece } from "../assets/svg/delMasterpiece.svg";

import { deleteMasterpiece } from "../services/marcusApi";

import Movie from "../views/Movie";

const Masterpiece = ({
  movieName,
  movieId,
  releasedDate,
  description,
  userName,
  userId,
  poster,
  currentPage,
  platform,
  setTriggerToast,
  isOwner,
}) => {
  const [showMovie, setShowMovie] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: mutateDelMasterpiece } = useMutation(
    () => deleteMasterpiece(movieId),
    {
      onSuccess: () => {
        setTriggerToast({
          type: "success",
          message: "Ce chef d'oeuvre a bien été supprimé",
        });
        queryClient.invalidateQueries(["masterpieces"]);
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
      <article className="masterpiece">
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            alt={movieName}
          />
        ) : (
          <div
            style={{ width: "12rem", textAlign: "center", fontSize: "5rem" }}
          >
            🤷
          </div>
        )}
        <div className="masterpiece-right">
          <h2 onClick={() => setShowMovie(true)} className="masterpiece-title">
            {movieName}
          </h2>
          <p className="masterpiece-director">{releasedDate?.split("-")[0]}</p>
          <p className="masterpiece-description">{description}</p>
          <footer className="masterpiece-footer">
            {currentPage === "profil" ? (
              ""
            ) : (
              <p className="masterpiece-footer-userName">
                <a href={`/profil/${userId}`}>{userName}</a>
              </p>
            )}
            <div className="masterpiece-footer-icons">
              {isOwner && <DelMasterpiece className="delete-icon" onClick={mutateDelMasterpiece} />}
              <MovieInfo onClick={() => setShowMovie(true)} />
            </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default Masterpiece;
