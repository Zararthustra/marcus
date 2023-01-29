import axios from "axios";
import { TMDB_BASE_PATH, TMDB_BASE_PARAMS } from "./apiVariables";


export const getMovieById = (movieId) => {
  return axios.get(`${TMDB_BASE_PATH}/movie/${movieId}`, {
    params: TMDB_BASE_PARAMS,
  });
};

export const getMoviesById = (movieIds) => {
  let movies = []
  for (const movieId in movieIds) {
    movies.push('test' + movieId)
  }
  // return axios.get(`${TMDB_BASE_PATH}/movie/${movieId}`, {
  //   params: TMDB_BASE_PARAMS,
  // });
  return movies
};
