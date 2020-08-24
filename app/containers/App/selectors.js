/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectPathname = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location.pathname,
  );

const makeSelectIdToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.idToken,
  );

const makeSelectUserLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
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
  makeSelectLastName,
  makeSelectFirstName,
  (lastName, firstName) =>
    `${lastName}${firstName}`.length > 0
      ? `${lastName}${firstName}`
      : 'this is fullname',
);

export {
  selectGlobal,
  makeSelectIdToken,
  makeSelectUser,
  makeSelectUserLoading,
  makeSelectLocation,
  makeSelectFullName,
  makeSelectEmail,
  makeSelectUserAccessGroup,
  makeSelectPathname,
};
