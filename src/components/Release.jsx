import "../styles/Release.css";
import { useState } from "react";
import { useQuery } from "react-query";

import { TMDB_IMG_PATH } from "../services/apiVariables";
import { getCinemaReleases, getNetflixReleases } from "../services/tmdbApi";

import Movie from "../views/Movie";

const Release = ({ releaseType }) => {
  const [showMovie, setShowMovie] = useState(false);
  const { data: cinemaData } = useQuery(["getCinemaReleases"], () =>
    getCinemaReleases()
  );
  const { data: netflixData } = useQuery(["getNetflixReleases"], () =>
    getNetflixReleases()
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
      {showMovie && (
        <Movie
          movieId={showMovie}
          setShowMovie={setShowMovie}
          platform={releaseType === "Cinéma" ? "movie" : "tv"}
        />
      )}
      <div className="release">
        <h1>
          {releaseType === "Cinéma" ? "À la une" : "Sorties " + releaseType}
        </h1>
        <div className="posters">
          {getReleases(releaseType)?.map((item, index) => {
            return (
              <article key={index}>
                <img
                  onClick={() => setShowMovie(item.id)}
                  src={TMDB_IMG_PATH + item.poster_path}
                  alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Release;
