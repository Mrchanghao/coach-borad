/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectPathName = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location.pathname,
  );

const makeSelectIdToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.idToken,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.user,
  );
const makeSelectUserAccessGroup = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.user.group.access,
  );
const makeSelectEmail = createSelector(
  selectGlobal,
  globalState => globalState.userData.user.email,
);
const makeSelectFirstName = createSelector(
  selectGlobal,
  globalState => globalState.userData.user.first_name,
);
const makeSelectLastName = createSelector(
  selectGlobal,
  globalState => globalState.userData.user.last_name,
);

const makeSelectFullName = createSelector(
  makeSelectFirstName,
  makeSelectLastName,
  (firstName, lastName) =>
    `${lastName}${firstName}`.length > 0 ? `${lastName}${firstName}` : '회원님',
);

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectUser,
  makeSelectLoading,
  makeSelectIdToken,
  makeSelectError,
  makeSelectPathName,
  makeSelectUserAccessGroup,
  makeSelectEmail,
  makeSelectFullName,
  makeSelectLocation,
};
