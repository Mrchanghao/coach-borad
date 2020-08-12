import { put, takeLatest, all } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { unSetClient } from 'containers/App/actions';
import { LOGOUT_REQUESTING } from './constants';

function* logoutSaga() {
  yield put(unSetClient());
  yield put(replace('/login'));
}

export function* rootSaga() {
  yield all([takeLatest(LOGOUT_REQUESTING, logoutSaga)]);
}
