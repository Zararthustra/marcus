import axios from "axios";
import {
  masterpieces,
  critics,
  watchlists,
  votes,
  users_data,
} from "./mockedApi";
import { MARCUS_BASE_PATH, IS_MOCKED_DATA } from "./apiVariables";
import { getLocalStorage } from "../utils/localStorage";

export const getMasterpieces = () => {
  if (IS_MOCKED_DATA) return masterpieces;
  return axios.get(`${MARCUS_BASE_PATH}/masterpieces`);
};

export const getWatchlists = () => {
  if (IS_MOCKED_DATA) return watchlists;
  return axios.get(`${MARCUS_BASE_PATH}/watchlists`);
};

export const addToWatchlist = (movieId, movieName) => {
  axios
    .post(
      `${MARCUS_BASE_PATH}/watchlists`,
      {
        movie_id: movieId,
        movie_name: movieName,
      },
      { headers: { authorization: "Bearer " + getLocalStorage("access") } }
    )
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
};

export const getVotes = () => {
  if (IS_MOCKED_DATA) return votes;
  return axios.get(`${MARCUS_BASE_PATH}/votes`);
};

export const getCritics = () => {
  if (IS_MOCKED_DATA) return critics;
  return axios.get(`${MARCUS_BASE_PATH}/critics`);
};

export const getUsersData = () => {
  return users_data;
  // if (IS_MOCKED_DATA) return users_data;
  // return axios.get(`/users`);
};
