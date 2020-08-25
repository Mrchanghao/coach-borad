import { call, put, takeLatest, select, all } from 'redux-saga/effects';

import {
  FETCH_COURSE_PROGRESS_FAIL,
  FETCH_COURSE_PROGRESS_REQUEST,
  FETCH_COURSE_PROGRESS_SUCCESS,
  PAGINATE_COURSE_PROGRESS_FAIL,
  PAGINATE_COURSE_PROGRESS_REQUEST,
  PAGINATE_COURSE_PROGRESS_SUCCESS,
  FETCH_CLASS_PROGRESS_COURSE_LIST_FAIL,
  FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST,
  FETCH_CLASS_PROGRESS_COURSE_LIST_SUCCESS,
  FETCH_LEVEL_PROGRESS_FAIL,
  FETCH_LEVEL_PROGRESS_REQUEST,
  FETCH_LEVEL_PROGRESS_SUCCESS,
  FETCH_UNIT_PROGRESS_FAIL,
  FETCH_UNIT_PROGRESS_REQUEST,
  FETCH_UNIT_PROGRESS_SUCCESS,
} from './constants';
import { getRequest } from '../../../utils/request';

function* fetchCourseProgressSaga(action) {
  const { groupId, courseId, keyword, page } = action;
  try {
    let params = '?';
    if (groupId) params = `${params}alps-group=${groupId}`;
    if (courseId) params = `${params}&course=${courseId}`;
    if (keyword) {
      params = `${params}&search_keyword=${encodeURIComponent(keyword)}`;
    }
    if (page) params = `${params}&page=${page}`;
    const url = `/learning-progress/student-course-progress/${params}`;
    const courseProgress = yield call(getRequest, { url });
    yield put({ type: FETCH_COURSE_PROGRESS_SUCCESS, courseProgress });
  } catch (error) {
    yield put({ type: FETCH_COURSE_PROGRESS_FAIL, error });
  }
}

function* fetchClassProgressCourseListSaga(action) {
  const { groupId, userId } = action;

  try {
    let params = '?';
    if (groupId) params = `${params}alps-group=${groupId}`;
    if (userId) params = `${params}&user_id=${userId}`;
    const url = `/course/title/${params}`;
    const courseList = yield call(getRequest, { url });

    const initialCourse = [{ id: -1, value: -1, text: 'all' }];
    const transformedCourse = courseList.map(course => ({
      id: course.id,
      value: course.id,
      text: course.title,
    }));
    yield put({
      type: FETCH_CLASS_PROGRESS_COURSE_LIST_SUCCESS,
      courseList: userId
        ? transformedCourse
        : [...initialCourse, ...transformedCourse],
    });
  } catch (error) {
    yield put({ type: FETCH_CLASS_PROGRESS_COURSE_LIST_FAIL, error });
  }
}

function* paginateCourseProgressSaga(action) {
  const { groupId, courseId, page, keyword } = action;
  try {
    // 이전 state 의 코스 진행률
    const selectLearningProgress = state => state.learningProgress;
    const prevLearningProgress = yield select(selectLearningProgress);
    const prevCourseProgress = prevLearningProgress.courseProgress;

    let params = '?';
    if (groupId) params = `${params}alps-group=${groupId}`;
    if (courseId) params = `${params}&course=${courseId}`;
    if (keyword) {
      params = `${params}&search_keyword=${encodeURIComponent(keyword)}`;
    }
    if (page) params = `${params}&page=${page}`;
    const url = `/learning-progress/student-course-progress/${params}`;

    // 다움 페이지의 코스 진행률
    const courseProgress = yield call(getRequest, { url });

    const mergeProgress = [...prevCourseProgress, ...courseProgress.data];
    yield put({
      type: PAGINATE_COURSE_PROGRESS_SUCCESS,
      mergeProgress,
      paging: courseProgress.paging,
    });
  } catch (error) {
    yield put({
      type: PAGINATE_COURSE_PROGRESS_FAIL,
      error,
    });
  }
}

function* fetchLevelProgressSaga(action) {}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_COURSE_PROGRESS_REQUEST, fetchCourseProgressSaga()),
    takeLatest(
      FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST,
      fetchClassProgressCourseListSaga(),
    ),
    takeLatest(PAGINATE_COURSE_PROGRESS_REQUEST, paginateCourseProgressSaga()),
  ]);
}
