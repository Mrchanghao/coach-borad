import {
  FETCH_COURSE_PROGRESS_REQUEST,
  PAGINATE_COURSE_PROGRESS_REQUEST,
  FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST,
  FETCH_LEVEL_PROGRESS_REQUEST,
  FETCH_UNIT_PROGRESS_REQUEST,
} from './constants';

export function fetchCourseProgressAction({
  idToken,
  groupId,
  courseId,
  keyword,
}) {
  return {
    type: FETCH_COURSE_PROGRESS_REQUEST,
    idToken,
    courseId,
    groupId,
    keyword,
  };
}

export function paginateCourseProgressAction({
  idToken,
  groupId,
  courseId,
  page,
  keyword,
}) {
  return {
    type: PAGINATE_COURSE_PROGRESS_REQUEST,
    idToken,
    groupId,
    courseId,
    keyword,
    page,
  };
}

/**
 * Try to fetch class progress coures list
 */
export function fetchClassProgressCourseListAction({
  idToken,
  groupId,
  userId,
}) {
  return {
    type: FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST,
    idToken,
    groupId,
    userId,
  };
}

// fetch student level progress list
export function fetchLevelProgressAction({ idToken, userId, courseId }) {
  return {
    type: FETCH_LEVEL_PROGRESS_REQUEST,
    idToken,
    userId,
    courseId,
  };
}

export function fetchUnitProgressAction({
  idToken,
  userId,
  courseId,
  sectionId,
  isProblem,
  isVod,
}) {
  return {
    type: FETCH_UNIT_PROGRESS_REQUEST,
    idToken,
    userId,
    courseId,
    sectionId,
    isProblem,
    isVod,
  };
}
