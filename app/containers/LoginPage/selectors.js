import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectLogin = state => state.login || initialState;

const selectGloabl = state => state.global;
const makeSelectUsername = () =>
  createSelector(
    selectLogin,
    loginState => loginState.username,
  );

const makeSelectEmail = () =>
  createSelector(
    selectGloabl,
    global => global.userData.user.email,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLogin,
    loginState => loginState.loading,
  );
const makeSelectSuccessful = () =>
  createSelector(
    selectLogin,
    loginState => loginState.successful,
  );

const makeSelectError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.errors,
  );
export {
  makeSelectUsername,
  makeSelectEmail,
  makeSelectLoading,
  makeSelectSuccessful,
  makeSelectError,
};
