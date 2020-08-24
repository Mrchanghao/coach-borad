import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getRequest } from 'utils/request';
import { object } from 'prop-types';
import {
  FETCH_ALPS_CLASS_LIST_SUCCESS,
  FETCH_ALPS_CLASS_LIST_FAIL,
  FETCH_ALPS_CLASS_STUDENT_LIST_SUCCESS,
  FETCH_ALPS_CLASS_STUDENT_LIST_FAIL,
  FETCH_ALPS_CLASS_LIST_REQUEST,
  FETCH_ALPS_CLASS_STUDENT_LIST_REQUEST,
} from './constants';

export function* fetchAlpsClassListRequestSaga() {
  const url = '/account/alms-classes/';

  try {
    const alpsClassList = yield call(getRequest, { url });
    yield put({
      type: FETCH_ALPS_CLASS_LIST_SUCCESS,
      payload: { alpsClassList },
    });
    console.log(alpsClassList);
  } catch (error) {
    yield put({ type: FETCH_ALPS_CLASS_LIST_FAIL, error: error.response });
  }
}

export function* fetchAlpsClassStudentListRequestSaga(action) {
  const { alpsClassId } = action.payload;

  const url = `/account/students/?alms-class=${alpsClassId}`;
  try {
    let studentList = yield call(getRequest, { url });
    // console.log(studentList);
    if (studentList.results.length > 0) {
      studentList = studentList.results[0].student_users.map(student => {
        const o = Object.assign({}, student);
        o.full_name = student.last_name + student.first_name;
        return o;
      });
    } else {
      studentList = [];
    }
    yield put({
      type: FETCH_ALPS_CLASS_STUDENT_LIST_SUCCESS,
      payload: {
        studentList,
      },
    });
  } catch (error) {
    yield put({
      type: FETCH_ALPS_CLASS_STUDENT_LIST_FAIL,
      error: error.response,
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_ALPS_CLASS_LIST_REQUEST, fetchAlpsClassListRequestSaga),
    takeLatest(
      FETCH_ALPS_CLASS_STUDENT_LIST_REQUEST,
      fetchAlpsClassStudentListRequestSaga,
    ),
  ]);
}
