import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectClassManagement = state => state.myClass || initialState;

const makeSelectAlpsClassList = () =>
  createSelector(
    selectClassManagement,
    classManagementState => classManagementState.alpsClassList,
  );
const makeSelectAlpsClassListLoading = () =>
  createSelector(
    selectClassManagement,
    classManagementState => classManagementState.alpsClassListLoading,
  );

const makeSelectAlpsClassStudentList = () =>
  createSelector(
    selectClassManagement,
    classManagementState => classManagementState.alpsClassStudentList,
  );
const makeSelectAlpsClassStudentListLoading = () =>
  createSelector(
    selectClassManagement,
    classManagementState => classManagementState.alpsClassStudentListLoading,
  );

export {
  makeSelectAlpsClassList,
  makeSelectAlpsClassListLoading,
  makeSelectAlpsClassStudentList,
  makeSelectAlpsClassStudentListLoading,
};
