import { take, fork, call, put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getRequest } from 'utils/request';
import { PUSHER_KEY } from 'utils/constants';
import Pusher from 'pusher-js';
import { setClient, unSetClient, requestRedirectToLogin } from './actions';
import {
  FETCH_USER_REQUESTING,
  FETCH_USER_REQUESTING_SUCCESS,
  FETCH_USER_REQUESTING_FAIL,
  REDIRECT_TO_LOGIN_REQUEST,
  REDIRECT_TO_LOGIN_SUCCESS,
  TRY_CREATE_PUSHER_INSTANCE,
  TRY_CREATE_PUSHER_INSTANCE_ALREADY_EXIST,
  TRY_CREATE_PUSHER_INSTANCE_FAIL,
  TRY_CREATE_PUSHER_INSTANCE_SUCCESS,
  CLIENT_UNSET,
} from './constants';
// 1. LoginPage.saga에서 _idToken을 직접 주입하여 fetchUserFlow 호출
// 2. 새로고침시 App.js에서 _idToken이 없는 채로 fetchUserFlow 호출

export function* fetchUserFlow(_idToken) {
  const sessionToken = localStorage.getItem('alpsCoach.idtoken');
  const idToken = _idToken || sessionToken;
  let user;
  try {
    if (!idToken) throw new Error('Invalid token');
    const url = '/account/info/';
    user = yield call(getRequest, { url });
    yield put(setClient({ idToken, user }));
    yield put({ type: FETCH_USER_REQUESTING_SUCCESS });

    yield put({
      type: TRY_CREATE_PUSHER_INSTANCE,
      email: user.email,
      pusherInstance: null,
    });
  } catch (error) {
    yield put({ type: FETCH_USER_REQUESTING_FAIL });
    // 반드시 이런 형식으로 진행
    yield put(unSetClient());
    if (sessionToken == null) {
      const ps = `${document.location.pathname}${document.location.search}`;
      yield put(requestRedirectToLogin(ps));
    }
  }
  return user;
}

export function* loginPageToRedirect(action) {
  const { prevPage } = action;
  const next = encodeURIComponent(prevPage);

  yield put(push(`/login?${next}=${next}`));
  yield put({ type: REDIRECT_TO_LOGIN_SUCCESS });
}

export function* fetchUserWatcher() {
  while (true) {
    const { idToken } = yield take(FETCH_USER_REQUESTING);
    console.log(idToken);
    // export function fetchUserAction({ idToken }) {
    //   return {
    //     type: FETCH_USER_REQUESTING,
    //     idToken,
    //   };
    // }
    yield fork(fetchUserFlow, idToken);
  }
}

export function* createPusherInstacneSaga(action) {
  const { pusherInstance, email } = action;
  if (pusherInstance) {
    yield put({ type: TRY_CREATE_PUSHER_INSTANCE_ALREADY_EXIST });
    return pusherInstance;
  }
  try {
    const nextPusherInstance = new Pusher(PUSHER_KEY, {
      cluster: 'ap1',
      encrypted: true,
    });
    nextPusherInstance.subscribe(email);
    yield put({
      type: TRY_CREATE_PUSHER_INSTANCE_SUCCESS,
      pusherInstance: nextPusherInstance,
    });
    return nextPusherInstance;
  } catch (error) {
    yield put({ type: TRY_CREATE_PUSHER_INSTANCE_FAIL });
    return null;
  }
}

// export function* unSetClientSaga() {
//   localStorage.removeItem('alpsCoach.idtoken');
// }

export default function* rootSaga() {
  yield all([
    fetchUserWatcher(),
    takeLatest(REDIRECT_TO_LOGIN_REQUEST, loginPageToRedirect),
    takeLatest(TRY_CREATE_PUSHER_INSTANCE, createPusherInstacneSaga),
    // takeLatest(CLIENT_UNSET, unSetClientSaga),
  ]);
}
