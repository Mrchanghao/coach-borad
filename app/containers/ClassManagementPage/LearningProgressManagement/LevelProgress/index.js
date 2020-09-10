import React, { useEffect, useState } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { Spinner } from 'react-activity';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Icon, Accordion } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { push, goBack } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { parseSearch } from 'utils/routing';
// import { RefreshIcon } from 'components';
import { makeSelectIdToken } from 'containers/App/selectors';

import {
  fetchLevelProgressAction,
  fetchUnitProgressAction,
  fetchClassProgressCourseListAction,
} from '../actions';
import {
  Wrapper,
  InfoWrapper,
  StudentP,
  BodyWrapper,
  ToggleArrow,
  StudentCourseWrapper,
  LevelRefreshWrapper,
} from './styles';

import { makeSelectAlpsClassListLoading } from '../../selectors';
import {
  makeSelectClassProgressCourseList,
  makeSelectLevelProgress,
  makeSelectLevelProgressLoading,
  makeSelectStudentName,
} from '../selectors';

import { LoadingWrapper } from '../styles';
import LevelProgressItem from './LevelProgressItem/index';

const LevelProgress = ({
  fetchUnitProgress,
  fetchLevelProgress,
  selectedAlpsClass,
  fetchClassProgressCourseList,
  courseList,
  studentName,
  classListLoading,
  levelProgress,
  levelProgressLoading,
  pop,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  // 왜 이뮤터블 라이브러리를 쓴거지?
  /*
     컴포넌트는 Immutable 의 List 와 호환이 되기 때문에, 이를 map 해도 컴포넌트로 렌더링 해 줄 수 있다
  */
  console.log(selectedAlpsClass);
  const [levelProgressState, setLevelProgressState] = useState(List([]));

  useEffect(() => {
    if (!selectedAlpsClass) return;
    const { userId, courseId } = parseSearch(window.location.search);
    const groupId = selectedAlpsClass.id;

    fetchLevelProgress({ userId, groupId, courseId });
    fetchClassProgressCourseList({ userId, groupId });
    setSelectedCourseId(Number(courseId));
  }, []);

  useEffect(() => {
    if (!selectedAlpsClass) return;

    const { userId, courseId } = parseSearch(window.location.search);
    const groupId = selectedAlpsClass.id;
    console.log(groupId);
    setSelectedCourseId(Number(courseId));
    fetchLevelProgress({ userId, selectedCourseId });
    fetchClassProgressCourseList({ userId, groupId });
  }, [selectedAlpsClass]);
};

LevelProgress.propTypes = {
  selectedAlpsClass: PropTypes.object,
  classListLoading: PropTypes.bool,
  courseList: PropTypes.array,
  levelProgress: PropTypes.array,
  levelProgressLoading: PropTypes.bool,
  fetchLevelProgress: PropTypes.func,
  fetchUnitProgress: PropTypes.func,
  fetchClassProgressCourseList: PropTypes.func,
  pop: PropTypes.func,
  studentName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  idToken: makeSelectIdToken(),
  classListLoading: makeSelectAlpsClassListLoading(),
  courseList: makeSelectClassProgressCourseList(),
  LevelProgress: makeSelectLevelProgress(),
  levelProgresssLoading: makeSelectLevelProgressLoading(),
  studentName: makeSelectStudentName(),
});

const mapDispatchToProps = dispatch => ({
  pushUrl: nextUrl => dispatch(push(nextUrl)),
  pop: () => dispatch(goBack()),
  fetchClassProgressCourseList: ({ idToken, userId, groupId }) =>
    dispatch(
      fetchClassProgressCourseListAction({
        idToken,
        userId,
        groupId,
      }),
    ),
  fetchLevelProgress: ({ idToken, userId, courseId }) =>
    dispatch(fetchLevelProgressAction({ idToken, userId, courseId })),
  fetchUnitProgress: ({
    idToken,
    userId,
    courseId,
    sectionId,
    isProblem,
    isVod,
  }) =>
    dispatch(
      fetchUnitProgressAction({
        idToken,
        userId,
        courseId,
        sectionId,
        isProblem,
        isVod,
      }),
    ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(LevelProgress);
