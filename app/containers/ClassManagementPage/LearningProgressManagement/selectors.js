import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectLearningProgress = state => state.learningProgress || initialState;

const makeSelectCourseProgress = () =>
  createSelector(
    selectLearningProgress,
    learningProgress => learningProgress.courseProgress,
  );
const makeSelectCourseProgressPaging = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.courseProgressPaging,
  );

const makeSelectCourseProgressLoading = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.courseProgressLoading,
  );

const makeSelectCourseProgressPaginating = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.courseProgressPaginating,
  );
const makeSelectClassProgressCourseList = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.courseList,
  );

const makeSelectStudentName = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.studentName,
  );
const makeSelectLevelProgress = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.levelProgress,
  );
const makeSelectLevelProgressLoading = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.levelProgressLoading,
  );

const makeSelectUnitProgress = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.unitProgress,
  );

const makeSelectUnitProgressLoading = () =>
  createSelector(
    selectLearningProgress,
    learningProgressState => learningProgressState.unitProgressLoading,
  );

export {
  makeSelectCourseProgress,
  makeSelectCourseProgressPaging,
  makeSelectCourseProgressLoading,
  makeSelectCourseProgressPaginating,
  makeSelectClassProgressCourseList,
  makeSelectLevelProgress,
  makeSelectLevelProgressLoading,
  makeSelectUnitProgress,
  makeSelectUnitProgressLoading,
  makeSelectStudentName,
};
