import axios from "axios";
import {
  masterpieces,
  critics,
  watchlists,
  votes,
  users_data,
} from "../mockApi/mockedDatas";


const PROTOCOL = {
  unsecure: "http",
  secure: "https",
};
const HOST = {
  domain: "planifit.pythonanywhere.com",
  localhost: "localhost:8000",
};

// const token = getLocalStorage('accessToken')
//axios.defaults.headers.common["Authorization"] = "Bearer " + token;



// Toggle this value to get data from server or from mockedAPI
const MOCKED_DATA = true;
// const MOCKED_DATA = false;

// Toggle this value to get data from local or prod environment
axios.defaults.baseURL = PROTOCOL.unsecure + "://" + HOST.localhost + "/api";
// axios.defaults.baseURL = PROTOCOL.secure + "://" + HOST.domain + "/api";


export const getMasterpieces = () => {
  if (MOCKED_DATA) return masterpieces;
  return axios.get(`/masterpieces`);
};

export const getWatchlists = () => {
  if (MOCKED_DATA) return watchlists;
  return axios.get(`/watchlists`);
};

export const getVotes = () => {
  if (MOCKED_DATA) return votes;
  return axios.get(`/votes`);
};

export const getCritics = () => {
  if (MOCKED_DATA) return critics;
  return axios.get(`/critics`);
};

export const getUsersData = () => {
  return users_data;
  // if (MOCKED_DATA) return users_data;
  // return axios.get(`/users`);
};
