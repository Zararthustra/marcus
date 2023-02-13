import "../styles/Vote.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as Info } from "../assets/svg/info.svg";
import { ReactComponent as DelVote } from "../assets/svg/delVote.svg";

import { deleteVote } from "../services/marcusApi";

import Movie from "./Movie";
import Stars from "./Stars";

const Vote = ({
  movieName,
  movieId,
  value,
  userName,
  userId,
  currentPage,
  platform,
  setTriggerToast,
  isOwner,
}) => {
  const [showMovie, setShowMovie] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: mutateDelVote } = useMutation(() => deleteVote(movieId), {
    onSuccess: () => {
      setTriggerToast({
        type: "success",
        message: "Votre vote a bien été supprimé",
      });
      queryClient.invalidateQueries(["votes"]);
    },
    onError: (err) => {
      if (err.response.status === 404)
        return setTriggerToast({
          type: "error",
          message: "Ce vote n'existe plus !",
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
      <div className="vote">
        <div onClick={() => setShowMovie(true)}>{movieName}</div>
        <Stars value={value} displayOnly={true} />
        {currentPage === "profil" ? (
          ""
        ) : (
          <a href={`/profil/${userId}`}>{userName}</a>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {isOwner && <DelVote onClick={mutateDelVote} />}
          <Info className="movie-info-svg" onClick={() => setShowMovie(true)} />
        </div>
      </div>
    </>
  );
};

export default Vote;
