/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/*
 * CoursePageReducer
 */
// constants
import produce from 'immer';
import {
  FETCH_COURSE_PROGRESS_FAIL,
  FETCH_COURSE_PROGRESS_REQUEST,
  FETCH_COURSE_PROGRESS_SUCCESS,
  PAGINATE_COURSE_PROGRESS_FAIL,
  PAGINATE_COURSE_PROGRESS_SUCCESS,
  PAGINATE_COURSE_PROGRESS_REQUEST,
  FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST,
  FETCH_CLASS_PROGRESS_COURSE_LIST_SUCCESS,
  FETCH_CLASS_PROGRESS_COURSE_LIST_FAIL,
  FETCH_LEVEL_PROGRESS_REQUEST,
  FETCH_LEVEL_PROGRESS_FAIL,
  FETCH_LEVEL_PROGRESS_SUCCESS,
  FETCH_UNIT_PROGRESS_REQUEST,
  FETCH_UNIT_PROGRESS_FAIL,
  FETCH_UNIT_PROGRESS_SUCCESS,
} from './constants';

export const initialState = {
  courseList: [],
  courseListLoading: false,
  courseProgress: [],
  courseProgressPaginating: false,
  courseProgressLoading: false,
  courseProgressPaging: {
    num_pages: null,
    cur_page: null,
  },
  studentName: '',
  levelProgress: [],
  levelProgressPaginating: false,
  levelProgressLoading: false,
  levelProgressPaging: {
    num_pages: null,
    cur_page: null,
  },
  unitProgress: [
    {
      unit: {
        title: '',
      },
      submissions: [
        {
          score: null,
          is_arch_final: null,
          update: new Date(),
        },
      ],
      vod_progress: {
        progress: null,
      },
    },
  ],
};

const learningProgressReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_COURSE_PROGRESS_REQUEST:
        draft.courseProgressLoading = true;
        break;
      case FETCH_COURSE_PROGRESS_SUCCESS:
        draft.courseProgress = action.courseProgress.data;
        draft.courseProgressPaging = action.courseProgress.paging;
        draft.courseProgressLoading = false;
        break;
      case FETCH_COURSE_PROGRESS_FAIL:
        draft.courseProgressLoading = false;
        break;
      case PAGINATE_COURSE_PROGRESS_REQUEST:
        draft.courseProgressPaginating = true;
        break;
      case PAGINATE_COURSE_PROGRESS_SUCCESS:
        draft.courseProgress = action.mergedProgress;
        draft.courseProgressPaging = action.paging;
        draft.courseProgressPaginating = false;
        break;
      case PAGINATE_COURSE_PROGRESS_FAIL:
        draft.courseProgressPaginating = false;
        break;
      case FETCH_CLASS_PROGRESS_COURSE_LIST_REQUEST:
        draft.courseListLoading = true;
        break;
      case FETCH_CLASS_PROGRESS_COURSE_LIST_SUCCESS:
        draft.courseList = action.courseList;
        draft.courseListLoading = false;
        break;
      case FETCH_CLASS_PROGRESS_COURSE_LIST_FAIL:
        draft.courseListLoading = false;
        break;
      case FETCH_LEVEL_PROGRESS_REQUEST:
        draft.levelProgressLoading = true;
        draft.studentName = '로딩중';
        break;
      case FETCH_LEVEL_PROGRESS_SUCCESS:
        draft.levelProgress = action.levelProgress;
        draft.studentName = action.studentName;
        draft.levelProgressLoading = false;
        break;
      case FETCH_LEVEL_PROGRESS_FAIL:
        draft.levelProgressLoading = false;
        break;
      case FETCH_UNIT_PROGRESS_REQUEST:
        draft.unitProgressLoading = true;
        draft.unitProgress = [];
        break;
      case FETCH_UNIT_PROGRESS_SUCCESS:
        draft.unitProgress = action.unitProgress;
        draft.unitProgressLoading = false;
        break;
      case FETCH_UNIT_PROGRESS_FAIL:
        draft.unitProgressLoading = false;
        break;
    }
  });

export default learningProgressReducer;
