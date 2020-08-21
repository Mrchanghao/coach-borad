import { call, put, cancelled, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { fetchUserFlow } from 'containers/App/saga';
/*
function* fetchUserFlow(_idToken) {
*/
import { parseSearch } from 'utils/routing';

import { postRequest } from 'utils/request';
import { LOGIN_ERROR, LOGIN_REQUESTING } from './constants';
import { loginErrorAction, loginSuccessAction } from './actions';
import { CLIENT_UNSET } from '../App/constants';

function* loginFlow(action) {
  const { email, password } = action;
  let idToken;
  try {
    // call login api function
    // pause until success or fail error
    const url = '/account/token/obtain/';
    const data = { email, password };
    idToken = yield call(postRequest, { url, data });

    yield localStorage.setItem('alpsCoach.idToken', idToken.token);
    yield fetchUserFlow(idToken.token);
    yield put(loginSuccessAction());

    // redirect
    const searchObj = parseSearch(document.location.search);
    const { next } = searchObj;
    if (next) {
      yield put(push(decodeURIComponent(next)));
    } else {
      yield put(push('/'));
    }
  } catch (error) {
    console.log(error);
    localStorage.removeItem('alpsCoach.idToken');
    yield put(loginErrorAction({ error }));
  } finally {
    if (yield cancelled()) {
      yield put(push('/login'));
    }
  }
  return idToken;
}

function* logout() {
  yield put({ type: CLIENT_UNSET });
}

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN_REQUESTING, loginFlow),
    takeLatest(LOGIN_ERROR, logout),
  ]);
}
