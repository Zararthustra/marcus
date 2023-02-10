import "../styles/Movie.css";

import { ReactComponent as AddToWatchList } from "../assets/svg/watchList.svg";
import { ReactComponent as AddMasterpiece } from "../assets/svg/addMasterpiece.svg";

import { TMDB_IMG_PATH } from "../services/apiVariables";
import { addToMasterpieces, addToWatchlists } from "../services/marcusApi";
import { useMutation, useQueryClient } from "react-query";

const MovieDescription = ({
  id,
  posterPath,
  title,
  synopsis,
  releasedDate,
  platform,
  setTriggerToast,
}) => {
  const queryClient = useQueryClient();
  const { mutate: addMasterpiece } = useMutation(
    () => addToMasterpieces(id, title, platform),
    {
      onSuccess: () => {
        setTriggerToast({
          type: "success",
          message: title + " ajouté à vos chefs d'oeuvre !",
        });
        queryClient.invalidateQueries(["masterpieces"]);
      },
      onError: (err) => {
        if (err.response.status === 400)
          return setTriggerToast({
            type: "error",
            message: "Ce film fait déjà partie de vos chefs d'oeuvre !",
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

  const { mutate: addWatchlist } = useMutation(
    () => addToWatchlists(id, title, platform),
    {
      onSuccess: () => {
        setTriggerToast({
          type: "success",
          message: title + " ajouté à votre watchlist !",
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
    <div className="movie-description">
      {posterPath && <img src={TMDB_IMG_PATH + posterPath} alt={title} />}
      <div className="movie-infos">
        <h1>{title}</h1>
        <p>{releasedDate.split("-")[0]}</p>
        <p>{synopsis}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <AddToWatchList onClick={addWatchlist} />
          <AddMasterpiece onClick={addMasterpiece} />
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
