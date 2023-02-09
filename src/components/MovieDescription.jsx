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
}) => {
  const queryClient = useQueryClient();
  const { mutate: addMasterpiece } = useMutation(
    () => addToMasterpieces(id, title, platform),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["masterpieces"]);
      }, // Trigger toast here
      onError: (err) => console.error(err), // Trigger toast here
    }
  );

  const { mutate: addWatchlist } = useMutation(
    () => addToWatchlists(id, title, platform),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["watchlists"]);
      }, // Trigger toast here
      onError: (err) => console.error(err), // Trigger toast here
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
