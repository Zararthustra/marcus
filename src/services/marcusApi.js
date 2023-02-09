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

export const getMasterpieces = async (user_id) => {
  if (IS_MOCKED_DATA) return masterpieces;
  if (user_id)
    return await axios.get(
      `${MARCUS_BASE_PATH}/masterpieces?user_id=${user_id}`
    );
  return await axios.get(`${MARCUS_BASE_PATH}/masterpieces`);
};

export const getWatchlists = async (user_id) => {
  if (IS_MOCKED_DATA) return watchlists;
  if (user_id)
    return await axios.get(`${MARCUS_BASE_PATH}/watchlists?user_id=${user_id}`);
  return await axios.get(`${MARCUS_BASE_PATH}/watchlists`);
};

export const addToWatchlists = async (movieId, movieName, platform) => {
  return await axios.post(
    `${MARCUS_BASE_PATH}/watchlists`,
    {
      movie_id: movieId,
      movie_name: movieName,
      platform: platform,
    },
    { headers: { authorization: "Bearer " + getLocalStorage("access") } }
  );
};

export const addToMasterpieces = async (movieId, movieName, platform) => {
  return await axios.post(
    `${MARCUS_BASE_PATH}/masterpieces`,
    {
      movie_id: movieId,
      movie_name: movieName,
      platform: platform,
    },
    { headers: { authorization: "Bearer " + getLocalStorage("access") } }
  );
};

export const getVotes = async (user_id) => {
  if (IS_MOCKED_DATA) return votes;
  if (user_id)
    return await axios.get(`${MARCUS_BASE_PATH}/votes?user_id=${user_id}`);
  return await axios.get(`${MARCUS_BASE_PATH}/votes`);
};

export const getCritics = async (user_id) => {
  if (IS_MOCKED_DATA) return critics;
  if (user_id)
    return await axios.get(`${MARCUS_BASE_PATH}/critics?user_id=${user_id}`);
  return await axios.get(`${MARCUS_BASE_PATH}/critics`);
};

export const getCriticsVotes = async (movie_id) => {
  // if (IS_MOCKED_DATA) return criticsVotes;
  return await axios.get(`${MARCUS_BASE_PATH}/critics?movie_id=${movie_id}`);
};

export const getUsersData = async () => {
  if (IS_MOCKED_DATA) return users_data;
  return await axios.get(`${MARCUS_BASE_PATH}/users`);
};

export const getUserData = async (user_id) => {
  return user_data;
  // if (IS_MOCKED_DATA) return user_data;
  // return axios.get(`${MARCUS_BASE_PATH}/users/${user_id}`);
};
