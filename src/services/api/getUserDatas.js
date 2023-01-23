import axios from "axios";

const PROTOCOL = {
  unsecure: "http",
  secure: "https",
};
const HOST = {
  ip: "13.39.16.245",
  domain: "marcusback.arthurmayer.fr",
};
// const token = getLocalStorage('accessToken')

//axios.defaults.headers.common["Authorization"] = "Bearer " + token;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = PROTOCOL.unsecure + "://" + HOST.ip + "/api";

export const getMasterpieces = (userId, mockedData) => {
  if (mockedData) return mockedData
  return axios.get(`/masterpieces?user_id=${userId}`);
};

export const getWatchlists = (userId, mockedData) => {
  if (mockedData) return mockedData
  return axios.get(`/watchlists?user_id=${userId}`);
};

export const getVotes = (userId, mockedData) => {
  if (mockedData) return mockedData
  return axios.get(`/votes?user_id=${userId}`);
};

export const getCritics = (userId, mockedData) => {
  if (mockedData) return mockedData
  return axios.get(`/critics?user_id=${userId}`);
};

export const getUsersData = (mockedData) => {
  if (mockedData) return mockedData
  return axios.get(`/users`);
};
