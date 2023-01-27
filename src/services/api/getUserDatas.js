import axios from "axios";

const PROTOCOL = {
  unsecure: "http",
  secure: "https",
};
const HOST = {
  ip: "13.39.16.245",
  domain: "planifit.pythonanywhere.com",
  localhost: "localhost:8000",
};
// const token = getLocalStorage('accessToken')

//axios.defaults.headers.common["Authorization"] = "Bearer " + token;
axios.defaults.baseURL = PROTOCOL.secure + "://" + HOST.domain + "/api";

export const getMasterpieces = (mockedData) => {
  if (mockedData) return mockedData;
  return axios.get(`/masterpieces`);
};

export const getWatchlists = (userId, mockedData) => {
  if (mockedData) return mockedData;
  return axios.get(`/watchlists`);
};

export const getVotes = (userId, mockedData) => {
  if (mockedData) return mockedData;
  return axios.get(`/votes`);
};

export const getCritics = (userId, mockedData) => {
  return axios.get(`/critics`);
};

export const getUsersData = (mockedData) => {
  if (mockedData) return mockedData;
  return axios.get(`/users`);
};
