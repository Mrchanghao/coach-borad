import { LOGOUT_REQUESTING } from './constants';

export function requestLogoutAction() {
  return {
    type: LOGOUT_REQUESTING,
  };
}
