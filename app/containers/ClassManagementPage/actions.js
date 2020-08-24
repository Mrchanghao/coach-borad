import {
  FETCH_ALPS_CLASS_LIST_REQUEST,
  FETCH_ALPS_CLASS_STUDENT_LIST_REQUEST,
} from './constants';

export function fetchAlpsClassListRequestAction({ idToken }) {
  return {
    type: FETCH_ALPS_CLASS_LIST_REQUEST,
    payload: {
      idToken,
    },
  };
}

/*

fetch student list
*/

export function fetchAlpsClassStudentListRequestionAction({
  idToken,
  alpsClassId,
}) {
  return {
    type: FETCH_ALPS_CLASS_STUDENT_LIST_REQUEST,
    payload: {
      idToken,
      alpsClassId,
    },
  };
}
