/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  CLIENT_SET,
  CLIENT_UNSET,
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_SUCCESS,
  FETCH_USER_REQUESTING_FAIL,
  REDIRECT_TO_LOGIN_REQUEST,
  TRY_CREATE_PUSHER_INSTANCE,
} from './constants';

/**
 * Dispatched when [ user hit F5 ] or [ user try to login ]
 *
 * @return {object}       An action object with a type of CLIENT_UNSET
 */

export function setClient({ idToken, user }) {
  return {
    type: CLIENT_SET,
    user,
    idToken,
  };
}

export function unSetClient() {
  localStorage.removeItem('alpsCoach.idToken');
  return {
    type: CLIENT_UNSET,
  };
}

/**
 * Dispatched when [ user hit F5 ] or [ user try to login ]
 *
 * @return {object}       An action object with a type of CLIENT_UNSET
 */
export function fetchUserAction({ idToken }) {
  return {
    type: FETCH_USER_REQUESTING,
    idToken,
  };
}
export function fetchUserFailAction({ idToken }) {
  return {
    type: FETCH_USER_REQUESTING_FAIL,
    idToken,
  };
}
export function fetchUserSuccessAction({ idToken }) {
  return {
    type: FETCH_USER_REQUESTING_SUCCESS,
    idToken,
  };
}

export function requestRedirectToLogin(prevPage) {
  return {
    type: REDIRECT_TO_LOGIN_REQUEST,
    prevPage,
  };
}

export function tryCreatePusherInstanceAction({ email, pusherInstance }) {
  return {
    type: TRY_CREATE_PUSHER_INSTANCE,
    email,
    pusherInstance,
  };
}
