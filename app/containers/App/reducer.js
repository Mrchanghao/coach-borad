/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CLIENT_SET,
  CLIENT_UNSET,
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_FAIL,
  FETCH_USER_REQUESTING_SUCCESS,
  TRY_CREATE_PUSHER_INSTANCE_SUCCESS,
  TRY_CREATE_PUSHER_INSTANCE_FAIL,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  userData: {
    user: {
      id: null,
      email: null,
      username: null,
      isChatAvailable: null,
      first_name: null,
      last_name: null,
      has_popup: false,
      profile: {
        cellphone: '',
        school: '',
        department: '',
        date_of_birth: '',
      },
      group: {
        access: null,
      },
    },
    idToken: null,
  },
  pusherInstance: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USER_REQUESTING:
        draft.loading = true;
        break;
      case FETCH_USER_REQUESTING_SUCCESS:
        draft.loading = false;
        break;
      case FETCH_USER_REQUESTING_FAIL:
        draft.loading = false;
        break;
      case CLIENT_SET:
        draft.error = false;
        draft.userData.idToken = action.idToken;
        draft.userData.user = action.user;
        break;
      case CLIENT_UNSET:
        draft.loading = false;
        draft.userData = initialState.userData;
        break;
      case TRY_CREATE_PUSHER_INSTANCE_SUCCESS:
        draft.pusherInstance = action.pusherInstance;
        break;
      case TRY_CREATE_PUSHER_INSTANCE_FAIL:
        draft.pusherInstance = null;
        break;
    }
  });

export default appReducer;
