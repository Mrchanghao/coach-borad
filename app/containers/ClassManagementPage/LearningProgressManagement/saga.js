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

// try {
//   let params = '?';
//   if (groupId) params = `${params}alms-group=${groupId}`;
//   if (courseId) params = `${params}&course=${courseId}`;
//   if (keyword) {
//     params = `${params}&search_keyword=${encodeURIComponent(keyword)}`;
//   }
//   if (page) params = `${params}&page=${page}`;
//   const url = `/learning-progress/student-course-progresses/${params}`;
//   const courseProgress = yield call(getRequest, {
//     url,
//   });

function* fetchCourseProgressSaga(action) {
  const { groupId, courseId, keyword, page } = action;
  try {
    let params = '?';
    if (groupId) params = `${params}alms-group=${groupId}`;
    if (courseId) params = `${params}&course=${courseId}`;

    if (keyword) {
      params = `${params}&search_keyword=${encodeURIComponent(keyword)}`;
    }
    if (page) params = `${params}&page=${page}`;
    const url = `/learning-progress/student-course-progresses/${params}`;
    const courseProgress = yield call(getRequest, { url });
    yield put({ type: FETCH_COURSE_PROGRESS_SUCCESS, courseProgress });
  } catch (error) {
    console.log(error, 'FETCH_COURSE_PROGRESS_FAIL');
    yield put({ type: FETCH_COURSE_PROGRESS_FAIL, error });
  }
}

function* fetchClassProgressCourseListSaga(action) {
  const { groupId, userId } = action;
  try {
    let params = '?';
    if (groupId) params = `${params}alms-group=${groupId}`;
    if (userId) params = `${params}&user_id=${userId}`;
    const url = `/courses/title/${params}`;
    const courseList = yield call(getRequest, {
      url,
    });
    const initial = [{ id: -1, value: -1, text: 'all' }];
    const transfomed = courseList.map(course => ({
      id: course.id,
      value: course.id,
      text: course.title,
    }));
    yield put({
      type: FETCH_CLASS_PROGRESS_COURSE_LIST_SUCCESS,
      courseList: userId ? transfomed : [...initial, ...transfomed],
    });
  } catch (error) {
    console.log(error, 'FETCH_CLASS_PROGRESS_COURSE_LIST_FAIL');
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
    if (groupId) params = `${params}alms-group=${groupId}`;
    if (courseId) params = `${params}&course=${courseId}`;
    if (keyword) {
      params = `${params}&search_keyword=${encodeURIComponent(keyword)}`;
    }
    if (page) params = `${params}&page=${page}`;
    const url = `/learning-progress/student-course-progresses/${params}`;

    // 다움 페이지의 코스 진행률
    const courseProgress = yield call(getRequest, { url });

    const mergeProgress = [...prevCourseProgress, ...courseProgress.data];
    yield put({
      type: PAGINATE_COURSE_PROGRESS_SUCCESS,
      mergeProgress,
      paging: courseProgress.paging,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: PAGINATE_COURSE_PROGRESS_FAIL,
      error,
    });
  }
}

function* fetchLevelProgressSaga(action) {
  const { userId, courseId } = action;
  try {
    let params = '?';
    if (userId) params = `${params}user_id=${userId}`;
    if (courseId) params = `${params}course_id=${courseId}`;
    const url = `/learning-progress/student-section-progresses/${params}`;

    const result = yield call(getRequest, { url });
    const transformedProgress = result.data.map(progress => ({
      ...progress,
      isOpen: false,
      isProblem: true,
      isVod: true,
    }));
    const final = { ...result, data: transformedProgress };
    console.log(final);
    yield put({
      type: FETCH_LEVEL_PROGRESS_SUCCESS,
      levelProgress: final.data,
      studentName: final.user.full_name,
    });
  } catch (error) {
    yield put({ type: FETCH_LEVEL_PROGRESS_FAIL, error });
  }
}

function* fetchUnitProgressSaga(action) {
  const { userId, courseId, sectionId, isProblem, isVod } = action;
  try {
    let params = '?';
    if (userId) params = `${params}user_id=${userId}`;
    if (courseId) params = `${params}course_id=${courseId}`;
    if (sectionId) params = `${params}section_id=${sectionId}`;
    params = `${params}&is_pro=${isProblem}`;
    params = `${params}&is_vod=${isVod}`;

    const url = `/learning-progress/student-section-progresses/architectures/${params}`;
    const result = yield call(getRequest, { url });

    yield put({ type: FETCH_UNIT_PROGRESS_SUCCESS, unitProgress: result.data });
  } catch (error) {
    yield put({ type: FETCH_UNIT_PROGRESS_FAIL, error });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_COURSE_PROGRESS_REQUEST, fetchCourseProgressSaga),
    takeLatest(
      FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST,
      fetchClassProgressCourseListSaga,
    ),
    takeLatest(PAGINATE_COURSE_PROGRESS_REQUEST, paginateCourseProgressSaga),
    takeLatest(FETCH_LEVEL_PROGRESS_REQUEST, fetchLevelProgressSaga),
    takeLatest(FETCH_UNIT_PROGRESS_REQUEST, fetchUnitProgressSaga),
  ]);
}
