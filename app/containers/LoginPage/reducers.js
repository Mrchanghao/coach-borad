import produce from 'immer';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  email: '',
  loading: false,
  successful: false,
  messages: [],
  errors: [],
};
/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUESTING:
        draft.loading = true;
        draft.successful = false;
        draft.messages = [{ body: '로그인 중,,,...', time: new Date() }];
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.successful = true;
        draft.messages = [];
        break;
      case LOGIN_ERROR:
        draft.loading = false;
        draft.successful = false;
        draft.errors = [
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ];
        break;
    }
  });

export default loginReducer;
