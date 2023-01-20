import axios from "axios";

const PROTOCOL = { unsecure: "http", secure: "https" };
const HOST = { ip: "13.39.16.245", domain: "marcusback.arthurmayer.fr" };

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = PROTOCOL.unsecure + "://" + HOST.ip + "/api";

export const getMasterpieces = (userId) => {
  return axios.get(`/masterpieces?user_id=${userId}`);
};

export const getWatchlists = (userId) => {
  return axios.get(`/watchlists?user_id=${userId}`);
};

export const getVotes = (userId) => {
  return axios.get(`/votes?user_id=${userId}`);
};

export const getCritics = (userId) => {
  return axios.get(`/critics?user_id=${userId}`);
};
