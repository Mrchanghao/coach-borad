import axios from 'axios';
import { API_URL } from 'utils/constants';

function getIdToken() {
  return localStorage.getItem('alpsCoach.idToken');
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function getRequest({ url }) {
  const idToken = getIdToken();
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Client-hostname': `${window.location.hostname}`,
      Authorization: `JWT ${idToken}`,
    },
    url: `${API_URL + url}`,
  };
  return axios(options)
    .then(checkStatus)
    .then(parseJSON);
}

export function postRequest({ url, data }) {
  const idToken = getIdToken();
  const options = {
    method: 'POST',
    url: `${API_URL + url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Client-hostname': `${window.location.hostname}`,
      Authorization: `JWT ${idToken}`,
    },
    data: { ...data },
  };
  return axios(options)
    .then(checkStatus)
    .then(parseJSON);
}
