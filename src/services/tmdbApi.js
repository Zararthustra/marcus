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
    params: Object.assign(TMDB_BASE_PARAMS, {
      append_to_response: "videos,images",
      include_image_language: "fr, null",
    }),
  });
};
export const getNetflixReleases = () => {
  return axios.get(`${TMDB_BASE_PATH}/discover/tv`, {
    params: Object.assign(TMDB_BASE_PARAMS, { with_networks: 213 }),
  });
};

export const searchMovie = (movie_name) => {
  return axios.get(`${TMDB_BASE_PATH}/search/movie`, {
    params: Object.assign(TMDB_BASE_PARAMS, { query: movie_name }),
  });
};

export const searchTV = (tv_name) => {
  return axios.get(`${TMDB_BASE_PATH}/search/tv`, {
    params: Object.assign(TMDB_BASE_PARAMS, { query: tv_name }),
  });
};
