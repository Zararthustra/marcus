import React, { useState } from "react";
import { ReactComponent as CriticInfo } from "../assets/svg/info.svg";
import { ReactComponent as CriticWatchList } from "../assets/svg/watchList.svg";

import Movie from "./Movie";

import "../styles/Masterpiece.css";
import { addToWatchlists } from "../services/marcusApi";
import { useMutation, useQueryClient } from "react-query";

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
              <CriticWatchList onClick={mutateWatchlist} />
              <CriticInfo onClick={() => setShowMovie(true)} />
            </div>
          </footer>
        </div>
      </article>
    </>
  );
};

export default Masterpiece;
