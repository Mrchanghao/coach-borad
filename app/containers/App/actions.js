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
  UPDATE_USER_INFO,
  FETCH_USER_REQUESTING_FAIL,
} from './constants';

export function setClient({ idToken, user }) {
  return {
    type: CLIENT_SET,
    user,
    idToken,
  };
}
