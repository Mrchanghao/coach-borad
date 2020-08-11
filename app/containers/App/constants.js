/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

/**
 *    Login
 */
export const CLIENT_UNSET = 'board/App/CLIENT_UNSET';
export const CLIENT_SET = 'board/App/CLIENT_SET';
export const REDIRECT_TO_LOGIN_REQUEST = 'board/App/REDIRECT_TO_LOGIN_REQUEST';
export const REDIRECT_TO_LOGIN_SUCCESS = 'board/App/REDIRECT_TO_LOGIN_SUCCESS';

/**
 *    TD set
 */

/**
 *    User
 */
export const FETCH_USER_REQUESTING = 'board/App/FETCH_USER_REQUESTING';
export const FETCH_USER_REQUESTING_FAIL =
  'board/App/FETCH_USER_REQUESTING_FAIL';
export const FETCH_USER_REQUESTING_SUCCESS =
  'board/App/FETCH_USER_REQUESTING_SUCCESS';
export const UPDATE_USER_INFO = 'board/App/UPDATE_USER_INFO';

/**
 * PopUp
 */

/**
 *    pusher
 */
export const TRY_CREATE_PUSHER_INSTANCE =
  'board/App/TRY_CREATE_PUSHER_INSTANCE';
export const TRY_CREATE_PUSHER_INSTANCE_ALREADY_EXIST =
  'board/App/TRY_CREATE_PUSHER_INSTANCE_ALREADY_EXIST';
export const TRY_CREATE_PUSHER_INSTANCE_FAIL =
  'board/App/TRY_CREATE_PUSHER_INSTANCE_FAIL';
export const TRY_CREATE_PUSHER_INSTANCE_SUCCESS =
  'board/App/TRY_CREATE_PUSHER_INSTANCE_SUCCESS';
