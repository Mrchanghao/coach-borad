/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.app || { ...initialState };

const selectRouter = state => state.router;

const makeSelectPathName = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location.pathname,
  );
// const makeSelectUserData = () =>
//   createSelector(
//     selectApp,
//     appState => appState.userData,
//   );

const makeSelectIdToken = () =>
  createSelector(
    selectApp,
    appState => appState.userData.idToken,
  );

const makeSelectLoading = () =>
  createSelector(
    selectApp,
    appState => appState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectApp,
    appState => appState.error,
  );

const makeSelectUser = () =>
  createSelector(
    selectApp,
    appState => appState.userData.user,
  );
const makeSelectUserAccessGroup = () =>
  createSelector(
    selectApp,
    appState => appState.userData.user.group.access,
  );
const makeSelectEmail = createSelector(
  selectApp,
  appState => appState.userData.user.email,
);
const makeSelectFirstName = createSelector(
  selectApp,
  appState => appState.userData.user.first_name,
);
const makeSelectLastName = createSelector(
  selectApp,
  appState => appState.userData.user.last_name,
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
  selectApp,
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
