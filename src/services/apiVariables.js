//______________________ MARCUS _______________________

const protocol = {
  unsecure: "http",
  secure: "https",
};
const host = {
  domain: "planifit.pythonanywhere.com",
  localIP: "192.168.1.44:8000",
  localhost: "localhost:8000",
};

// Toggle this value to get data from server or from mockedAPI
export const IS_MOCKED_DATA = false;
// const IS_MOCKED_DATA = false

// Toggle this value to get data from local or prod environment
export const MARCUS_BASE_PATH = protocol.unsecure + "://" + host.localIP + "/api";
// export const MARCUS_BASE_PATH = protocol.secure + "://" + host.domain + "/api";

// const token = getLocalStorage('access')
// export const MARCUS_BASE_HEADER = "Bearer " + token;


//______________________ TMDB _______________________

const apiKey = '34e2e08fed7af733b62f781d945c6a7c';

export const TMDB_BASE_PATH = "https://api.themoviedb.org/3";
export const TMDB_IMG_PATH = "https://image.tmdb.org/t/p/w500/";
export const TMDB_BASE_PARAMS = { api_key: apiKey, language: "fr-FR" }

