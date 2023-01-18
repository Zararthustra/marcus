import axios from 'axios';

export const getMasterpieces = (userId) => {
    return axios.get(`https://marcusback.arthurmayer.fr/api/masterpieces?user_id=${userId}`)
}

export const getWatchlists = (userId) => {
    return axios.get(`https://marcusback.arthurmayer.fr/api/watchlists?user_id=${userId}`)
}

export const getVotes = (userId) => {
    return axios.get(`https://marcusback.arthurmayer.fr/api/votes?user_id=${userId}`)
}

export const getCritics = (userId) => {
    return axios.get(`https://marcusback.arthurmayer.fr/api/critics?user_id=${userId}`)
}
