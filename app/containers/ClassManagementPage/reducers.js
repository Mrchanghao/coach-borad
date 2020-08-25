/* eslint-disable no-param-reassign */
/*
 * CoursePageReducer
 */
import produce from 'immer';
// constants
import {
  FETCH_ALPS_CLASS_LIST_REQUEST,
  FETCH_ALPS_CLASS_LIST_FAIL,
  FETCH_ALPS_CLASS_LIST_SUCCESS,
  FETCH_ALPS_CLASS_STUDENT_LIST_REQUEST,
  FETCH_ALPS_CLASS_STUDENT_LIST_FAIL,
  FETCH_ALPS_CLASS_STUDENT_LIST_SUCCESS,
} from './constants';

export const initialState = {
  alpsClassList: [],
  alpsClassListLoading: false,
  alpsClassStudentList: [],
  alpsClassStudentListLoading: false,
};

const classManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case FETCH_ALPS_CLASS_LIST_REQUEST:
        draft.alpsClassListLoading = true;
        break;
      case FETCH_ALPS_CLASS_LIST_FAIL:
        draft.alpsClassListLoading = false;
        break;
      case FETCH_ALPS_CLASS_LIST_SUCCESS:
        draft.alpsClassListLoading = false;
        draft.alpsClassList = action.payload.alpsClassList.results;
        break;
      case FETCH_ALPS_CLASS_STUDENT_LIST_REQUEST:
        draft.alpsClassStudentListLoading = true;
        draft.alpsClassStudentList = [];
        break;
      case FETCH_ALPS_CLASS_STUDENT_LIST_FAIL:
        draft.alpsClassStudentListLoading = false;
        break;
      case FETCH_ALPS_CLASS_STUDENT_LIST_SUCCESS:
        draft.alpsClassStudentListLoading = false;
        draft.alpsClassStudentList = action.payload.alpsClassStudentList;
    }
  });

export default classManagementReducer;
