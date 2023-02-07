import "../styles/Movie.css";

import { ReactComponent as AddToWatchList } from "../assets/svg/watchList.svg";
import { ReactComponent as AddMasterpiece } from "../assets/svg/addMasterpiece.svg";

import { TMDB_IMG_PATH } from "../services/apiVariables";
import { addToMasterpieces, addToWatchlists } from "../services/marcusApi";

const MovieDescription = ({
  id,
  posterPath,
  title,
  synopsis,
  releasedDate,
}) => {
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
          <AddToWatchList onClick={() => addToWatchlists(id, title, "movie")} />
          <AddMasterpiece
            onClick={() => addToMasterpieces(id, title, "movie")}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
