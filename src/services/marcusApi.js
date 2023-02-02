import axios from "axios";
import {
  masterpieces,
  critics,
  watchlists,
  votes,
  users_data,
  user_data,
} from "./mockedApi";
import { MARCUS_BASE_PATH, IS_MOCKED_DATA } from "./apiVariables";
import { getLocalStorage } from "../utils/localStorage";

export const getMasterpieces = (user_id) => {
  if (IS_MOCKED_DATA) return masterpieces;
  if (user_id)
    return axios.get(`${MARCUS_BASE_PATH}/masterpieces?user_id=${user_id}`);
  return axios.get(`${MARCUS_BASE_PATH}/masterpieces`);
};

export const getWatchlists = (user_id) => {
  if (IS_MOCKED_DATA) return watchlists;
  if (user_id)
    return axios.get(`${MARCUS_BASE_PATH}/watchlists?user_id=${user_id}`);
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

export const getVotes = (user_id) => {
  if (IS_MOCKED_DATA) return votes;
  if (user_id) return axios.get(`${MARCUS_BASE_PATH}/votes?user_id=${user_id}`);
  return axios.get(`${MARCUS_BASE_PATH}/votes`);
};

export const getCritics = (user_id) => {
  if (IS_MOCKED_DATA) return critics;
  if (user_id)
    return axios.get(`${MARCUS_BASE_PATH}/critics?user_id=${user_id}`);
  return axios.get(`${MARCUS_BASE_PATH}/critics`);
};

export const getUsersData = () => {
  return users_data;
  // if (IS_MOCKED_DATA) return users_data;
  // return axios.get(`${MARCUS_BASE_PATH}/users`);
};

export const getUserData = (user_id) => {
  return user_data;
  // if (IS_MOCKED_DATA) return user_data;
  // return axios.get(`${MARCUS_BASE_PATH}/users/${user_id}`);
};
