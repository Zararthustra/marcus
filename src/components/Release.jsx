import "../styles/Release.css";
import { useState } from "react";
import { useQuery } from "react-query";

import { TMDB_IMG_PATH } from "../services/apiVariables";
import { getCinemaReleases, getNetflixReleases } from "../services/tmdbApi";

import Movie from "./Movie";

const Release = ({ releaseType }) => {
  const [showMovie, setShowMovie] = useState(false);
  const { data: cinemaData, status: cinemaStatus } = useQuery(
    ["getCinemaReleases"],
    () => getCinemaReleases()
  );
  const { data: netflixData, status: netflixStatus } = useQuery(
    ["getNetflixReleases"],
    () => getNetflixReleases()
  );

  const getReleases = (type) => {
    switch (type) {
      case "Cinéma":
        return cinemaData?.data.results;
      case "Netflix":
        return netflixData?.data.results;

      default:
        break;
    }
  };

  return (
    <>
      {showMovie && <Movie movieId={showMovie} setShowMovie={setShowMovie} />}
      <div className="release">
        <h1>{releaseType}</h1>
        <div className="posters">
          {getReleases(releaseType)?.map((item, index) => {
            return (
              <div className="truc" key={index}>
                <img
                  onClick={() => setShowMovie(item.id)}
                  src={TMDB_IMG_PATH + item.poster_path}
                  alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Release;
