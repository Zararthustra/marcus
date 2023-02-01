import axios from "axios";
import { TMDB_BASE_PATH, TMDB_BASE_PARAMS } from "./apiVariables";

export const getMovieById = (movieId) => {
  return axios.get(`${TMDB_BASE_PATH}/movie/${movieId}`, {
    params: Object.assign(TMDB_BASE_PARAMS, {
      append_to_response: "videos,images",
      include_image_language: "fr, null",
    }),
  });
};

export const getTvById = (tvId) => {
  return axios.get(`${TMDB_BASE_PATH}/tv/${tvId}`, {
    params: TMDB_BASE_PARAMS,
  });
};

export const getCinemaReleases = () => {
  return axios.get(`${TMDB_BASE_PATH}/discover/movie`, {
    params: TMDB_BASE_PARAMS,
  });
};
export const getNetflixReleases = () => {
  return axios.get(`${TMDB_BASE_PATH}/discover/tv`, {
    params: Object.assign(TMDB_BASE_PARAMS, { with_networks: 213 }),
  });
};
