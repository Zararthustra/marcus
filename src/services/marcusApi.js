import axios from "axios";
import { MARCUS_BASE_PATH } from "./apiVariables";
import { getLocalStorage } from "../utils/localStorage";

//__________________________________ Watchlist
export const getWatchlists = async (user_id) => {
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
export const deleteWatchlist = async (movieId) => {
  return await axios.delete(`${MARCUS_BASE_PATH}/watchlists`, {
    headers: { authorization: "Bearer " + getLocalStorage("access") },
    params: { movie_id: movieId },
  });
};

//__________________________________ Masterpiece
export const getMasterpieces = async (user_id) => {
  if (user_id)
    return await axios.get(
      `${MARCUS_BASE_PATH}/masterpieces?user_id=${user_id}`
    );
  return await axios.get(`${MARCUS_BASE_PATH}/masterpieces`);
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
export const deleteMasterpiece = async (movieId) => {
  return await axios.delete(`${MARCUS_BASE_PATH}/masterpieces`, {
    headers: { authorization: "Bearer " + getLocalStorage("access") },
    params: { movie_id: movieId },
  });
};

//__________________________________ Vote
export const getVotes = async (user_id) => {
  if (user_id)
    return await axios.get(`${MARCUS_BASE_PATH}/votes?user_id=${user_id}`);
  return await axios.get(`${MARCUS_BASE_PATH}/votes`);
};
export const deleteVote = async (movieId) => {
  return await axios.delete(`${MARCUS_BASE_PATH}/votes`, {
    headers: { authorization: "Bearer " + getLocalStorage("access") },
    params: { movie_id: movieId },
  });
};
export const addToVotes = async (movieId, movieName, voteValue, platform) => {
  return await axios.post(
    `${MARCUS_BASE_PATH}/votes`,
    {
      movie_id: movieId,
      movie_name: movieName,
      value: voteValue,
      platform: platform,
    },
    { headers: { authorization: "Bearer " + getLocalStorage("access") } }
  );
};

//__________________________________ Critic
export const getCritics = async (user_id) => {
  if (user_id)
    return await axios.get(`${MARCUS_BASE_PATH}/critics?user_id=${user_id}`);
  return await axios.get(`${MARCUS_BASE_PATH}/critics`);
};
export const deleteCritic = async (movieId) => {
  return await axios.delete(`${MARCUS_BASE_PATH}/critics`, {
    headers: { authorization: "Bearer " + getLocalStorage("access") },
    params: { movie_id: movieId },
  });
};
export const addToCritics = async (
  movieId,
  movieName,
  criticContent,
  platform
) => {
  return await axios.post(
    `${MARCUS_BASE_PATH}/critics`,
    {
      movie_id: movieId,
      movie_name: movieName,
      content: criticContent,
      platform: platform,
    },
    { headers: { authorization: "Bearer " + getLocalStorage("access") } }
  );
};

export const getCriticsVotes = async (movie_id) => {
  return await axios.get(`${MARCUS_BASE_PATH}/critics?movie_id=${movie_id}`);
};

//__________________________________ User
export const getUsersData = async () => {
  return await axios.get(`${MARCUS_BASE_PATH}/users`);
};
export const getUserData = async (user_id) => {
  return await axios.get(`${MARCUS_BASE_PATH}/users/${user_id}`);
};
