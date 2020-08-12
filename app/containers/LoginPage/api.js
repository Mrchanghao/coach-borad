import axios from 'axios';
import { API_URL } from 'utils/constants';

export function getIdTokenApi({ email, password }) {
  const payload = {
    email,
    password,
  };

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Client-hostname': `${window.location.hostname}`,
    },
    url: `${API_URL}/account/token/obtain/`,
    data: {
      ...payload,
    },
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => res.data)
      .then(data => resolve(data.token))
      .catch(err => reject(err));
  });
}
