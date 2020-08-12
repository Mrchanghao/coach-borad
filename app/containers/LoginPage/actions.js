import { LOGIN_REQUESTING, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

export function requestLoginAction({ email, password }) {
  return {
    type: LOGIN_REQUESTING,
    email,
    password,
  };
}

export function loginErrorAction({ error = null }) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function loginSuccessAction() {
  return {
    type: LOGIN_SUCCESS,
  };
}
