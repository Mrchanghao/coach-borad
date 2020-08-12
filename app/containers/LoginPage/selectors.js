import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectLogin = state => state.login || initialState;

const selectApp = state => state.global;
const makeSelectUsername = () =>
  createSelector(
    selectLogin,
    loginState => loginState.username,
  );

const makeSelectEmail = () =>
  createSelector(
    selectApp,
    globalState => globalState.userData.user.email,
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
