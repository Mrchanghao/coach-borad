import axios from 'axios';
import { API_URL } from './constants';

export const fetchWithAuth = ({ idToken, path, queryString = '' }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Client-hostname': `${window.location.hostname}`,
  };

  if (idToken) headers.Authorization = `JWT ${idToken}`;

  const options = {
    method: 'GET',
    headers,
    url: `${API_URL ? process.env.API_URL : API_URL}${path}${queryString}`,
  };
  return axios(options).then(res => res.data);
};
