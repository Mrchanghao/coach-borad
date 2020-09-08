import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input } from 'semantic-ui-react';
import { Spinner } from 'react-activity';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import {
  makeSelectIdToken,
  makeSelectUserLoading,
} from 'containers/App/selectors';

import {
  parseSearch,
  pathObj2PathStr,
  removeUrlParameter,
} from 'utils/routing';
import CircularLoadingIndicator from 'components/LoadingIndicator';

import RefreshIcon from 'components/RefreshIcon';
import {
  fetchCourseProgressAction,
  paginateCourseProgressAction,
  fetchClassProgressCourseListAction,
} from '../actions';
import { makeSelectAlpsClassListLoading } from '../../selectors';
import {
  makeSelectCourseProgress,
  makeSelectCourseProgressPaging,
  makeSelectCourseProgressLoading,
  makeSelectCourseProgressPaginating,
  makeSelectClassProgressCourseList,
} from '../selectors';

import {
  Wrapper,
  FilterWrapper,
  TableFooter,
  CourseP,
  TH,
  LearningProgress,
  LearningProgressWrapper,
  LearningProgressNum,
  CourseProgressTableWrapper,
  CourseProgressTableHeaderWrapper,
  CourseProgressTableBodyWrapper,
  CourseProgressTableBodyRowWrapper,
  CourseProgressTableBodyRowNameWrapper,
  CourseProgressTableBodyRowEmailWrapper,
} from './styles';
import { LoadingWrapper, LoadingText } from '../styles';

const CourseProgress = ({
  selectedAlpsClass,
  fetchCourseProgress,
  idToken,
  fetchClassProgressCourseList,
  paginateCourseProgress,
  pushUrl,
  courseProgressPaging,
  courseProgressList,
  courseProgressLoading,
  classListLoading,
  courseProgressPaginating,
  courseList,
}) => {
  // state
  const [selectedCourseId, setSelectedCourseId] = useState(-1);
  const [searchKeyword, setSearchKeyword] = useState('');

  // effect
  useEffect(() => {
    const { courseId } = parseSearch(window.location.search);

    if (selectedAlpsClass !== null) {
      const groupId = selectedAlpsClass.id || null;
      fetchClassProgressCourseList({ idToken, groupId });
      fetchCourseProgress({
        idToken,
        groupId,
        courseId: Number(courseId),
      });
      if (courseId) {
        setSelectedCourseId(Number(courseId));
      }
    }
  }, []);

  useEffect(() => {
    const { courseId } = parseSearch(window.location.search);
    if (!selectedAlpsClass) return;
    const groupId = selectedAlpsClass.id;
    fetchClassProgressCourseList({ idToken, groupId });
    fetchCourseProgress({ idToken, groupId, courseId: Number(courseId) });
    // url에 코스 아이디 있으면?
    if (courseId) {
      setSelectedCourseId(Number(courseId));
    } else {
      // 클래스가 달라질 때 검색어 코스 드롭다운 초기화
      setSelectedCourseId(-1);
      setSearchKeyword('');
    }
  }, [selectedAlpsClass]);

  const handleSearch = e => {
    const groupId = selectedAlpsClass.id;
    setSearchKeyword(e.target.value);
    fetchCourseProgress({
      idToken,
      groupId,
      courseId: selectedCourseId === -1 ? null : selectedCourseId,
      keyword: e.target.value,
    });
  };

  const handleRefresh = () => {
    const groupId = selectedAlpsClass.id;
    fetchCourseProgress({
      idToken,
      groupId,
      courseId: selectedCourseId === -1 ? null : selectedCourseId,
      keyword: searchKeyword,
    });
  };

  const handleCourseDropdown = (ev, { value }) => {
    const groupId = selectedAlpsClass.id;
    const { pathname } = window.location;
    if (value === -1) {
      const newUrl = removeUrlParameter(
        `${pathname}${window.location.search}`,
        'courseId',
      );
      pushUrl(newUrl);
    } else {
      const query = { ...parseSearch(window.location.search), courseId: value };
      const newUrl = pathObj2PathStr({ pathname, query });
      pushUrl(newUrl);
    }
    setSelectedCourseId(value);
    fetchCourseProgress({
      idToken,
      groupId,
      courseId: value === -1 ? null : value,
      keyword: searchKeyword,
    });
  };

  const handleCourseClick = ({ userId, courseId }) => {
    pushUrl(
      `/my-class/learning-progress/level?userId=${userId}&courseId=${courseId}`,
    );
  };

  const renderTable = () => {
    if (classListLoading || courseProgressLoading) {
      return <CircularLoadingIndicator size={20} />;
    }

    return (
      <CourseProgressTableWrapper>
        <CourseProgressTableHeaderWrapper>
          <TH>학생 이름</TH>
          <TH style={{ flex: 2 }}>이메일</TH>
          <TH
            style={{
              textAlign: 'left',
              paddingLeft: '30px',
              flex: 8,
              justifyContent: 'normal',
            }}
          >
            코스 진행률
          </TH>
          <TH
            style={{
              textAlign: 'right',
              paddingRight: '40px',
              flexDirection: 'row-reverse',
              justifyContent: 'normal',
            }}
          >
            평균 진행률
          </TH>
        </CourseProgressTableHeaderWrapper>
        <CourseProgressTableBodyWrapper>
          {courseProgressList.map(progress => (
            <CourseProgressTableBodyRowWrapper key={progress.id}>
              {/* 학생 이름 */}
              <CourseProgressTableBodyRowNameWrapper id="825a448d6b3bad31439c4da961dcdc09">
                {progress.full_name}
              </CourseProgressTableBodyRowNameWrapper>
              {/* 이메일 */}
              <CourseProgressTableBodyRowEmailWrapper>
                {progress.email}
              </CourseProgressTableBodyRowEmailWrapper>
              <div
                style={{ padding: '10px 20px', textAlign: 'left', flex: 9 }}
                colSpan={2}
              >
                {progress
                  ? progress.course_progress.map(course => (
                      <LearningProgressWrapper
                        percent={course.progress}
                        key={`progressBar=${course.id}`}
                        id="cbb52dc168d928c2829294444a7f95c7"
                        onClick={() =>
                          handleCourseClick({
                            userId: progress.id,
                            courseId: course.id,
                          })
                        }
                      >
                        <CourseP>{course.title}</CourseP>
                        <LearningProgressNum percent={course.progress}>
                          {`${Math.floor(course.progress)}%`}
                        </LearningProgressNum>
                        <LearningProgress
                          percent={course.progress}
                          size="tiny"
                          disabled={course.progress === 0}
                        />
                      </LearningProgressWrapper>
                    ))
                  : null}
              </div>
            </CourseProgressTableBodyRowWrapper>
          ))}
        </CourseProgressTableBodyWrapper>
      </CourseProgressTableWrapper>
    );
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <Dropdown
          search
          value={selectedCourseId}
          selection
          onChange={handleCourseDropdown}
          options={courseList}
        />
        <div>
          <RefreshIcon
            refreshing={courseProgressLoading}
            onClick={handleRefresh}
          />

          <Input
            icon="search"
            placeholder="학생 검색"
            value={searchKeyword}
            onChange={handleSearch}
          />
        </div>
      </FilterWrapper>
      {renderTable()}
      <TableFooter>
        {courseProgressPaginating ? (
          <LoadingWrapper>
            <LoadingText>데이터 로딩</LoadingText>
            <Spinner color="#a9a9a9" size={12} />
          </LoadingWrapper>
        ) : (
          <div />
        )}
      </TableFooter>
    </Wrapper>
  );
};

CourseProgress.propTypes = {
  pushUrl: PropTypes.func,
  classListLoading: PropTypes.bool,
  courseList: PropTypes.array,
  courseProgressList: PropTypes.array,
  courseProgressPaging: PropTypes.object,
  courseProgressLoading: PropTypes.bool,
  courseProgressPaginating: PropTypes.bool,
  selectedAlpsClass: PropTypes.object,
  idToken: PropTypes.string,
  fetchCourseProgress: PropTypes.func,
  fetchClassProgressCourseList: PropTypes.func,
  paginateCourseProgress: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  idToken: makeSelectIdToken(),
  userLoading: makeSelectUserLoading(),
  classListLoading: makeSelectAlpsClassListLoading(),
  courseList: makeSelectClassProgressCourseList(),
  courseProgressList: makeSelectCourseProgress(),
  courseProgressLoading: makeSelectCourseProgressLoading(),
  courseProgressPaging: makeSelectCourseProgressPaging(),
  courseProgressPaginating: makeSelectCourseProgressPaginating(),
});

const mapDispatchToProps = dispatch => ({
  pushUrl: nextUrl => dispatch(push(nextUrl)),
  fetchClassProgressCourseList: ({ idToken, groupId }) =>
    dispatch(fetchClassProgressCourseListAction({ idToken, groupId })),
  fetchCourseProgress: ({ idToken, groupId, courseId, keyword }) =>
    dispatch(
      fetchCourseProgressAction({ idToken, groupId, courseId, keyword }),
    ),
  paginateCourseProgress: ({ idToken, groupId, courseId, page, keyword }) =>
    dispatch(
      paginateCourseProgressAction({
        idToken,
        groupId,
        courseId,
        keyword,
      }),
    ),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(CourseProgress);
