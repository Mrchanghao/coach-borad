// studentmanagement
// submissionmanagement
// learning-progressmanagement
// tab select
import React, { useState, memo, useEffect } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// global saga things
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

// actions
import {
  makeSelectIdToken,
  makeSelectUserAccessGroup,
} from 'containers/App/selectors';
import { isEqual } from 'lodash/isEqual';
import {
  fetchAlpsClassListRequestAction,
  fetchAlpsClassStudentListRequestionAction,
} from './actions';
import saga from './saga';
import reducer from './reducers';
import {
  makeSelectAlpsClassList,
  makeSelectAlpsClassListLoading,
  makeSelectAlpsClassStudentList,
  makeSelectAlpsClassStudentListLoading,
} from './selectors';
import ManageTypeTab from './ManageTypeTab';
import ClassDropdown from './ClassDropdown';
import LearningProgressManagement from './LearningProgressManagement';
import {
  ClassManagementHeaderWrapper,
  ClassManagementWrapper,
  ClassManagementBodyWrapper,
} from './styles';
const key = 'myClass';

const ClassManagementPage = ({
  idToken,
  match,
  pushNextUrl,
  alpsClassList,
  fetchAlpsClassList,
  alpsClassListLoading,
  fetchAlpsClassStudentList,
}) => {
  const [selectedAlpsClass, setSelectedAlpsClass] = useState(null);
  const [selectedTypeKey, setSelectedTypeKey] = useState('consult');
  const [selectedTypeName, setSelectedTypeName] = useState('상담/기록 일지');
  const manageType = [
    { key: 'consult', title: '상담/기록 일지' },
    { key: 'sms', title: '문자 발송' },
  ];

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchAlpsClassList({ idToken });
  }, []);

  const onChangeSelectedAlpsClass = newAlpsClass => {
    if (!isEqual(selectedAlpsClass, newAlpsClass)) {
      const alpsClassId = newAlpsClass.id;
      fetchAlpsClassStudentList({ idToken, alpsClassId });
    }
    setSelectedAlpsClass(newAlpsClass);
  };

  const handleChangeType = (_selectedTypeKey, _selectedTypeName) => {
    setSelectedTypeKey(_selectedTypeKey);
    setSelectedTypeName(_selectedTypeName);
  };

  const renderManageType = () => {
    switch (match.params.manageType) {
      case 'learning-progress':
        return (
          <LearningProgressManagement
            selectedAlpsClass={selectedAlpsClass} // 선택 코스
          />
        );
      // case 'student':
      //   return <StudentManagement selectedAlpsClass={selectedAlpsClass} />;
      // case 'submission':
      //   return (
      //     <SubmissionManagement
      //       selectedAlpsClass={selectedAlpsClass} // 선택된 코스
      //       selectedTypeKey="consult" // 제출은 상담/일지 탭으로 고정
      //       location={location}
      //       selectedTypeName={selectedTypeName} // 우측 선택탭 이름
      //     />
      //   );
      default:
        return <div />;
    }
  };

  return (
    <ClassManagementWrapper>
      <ClassManagementHeaderWrapper>
        {/* 드롭다운 컴포넌트로 클래스리스트 fetch 한 후 리스트 셀렉트 */}
        <ClassDropdown
          push={pushNextUrl}
          alpsClassList={alpsClassList}
          alpsClassListLoading={alpsClassListLoading}
          onChangeSelectedAlpsClass={onChangeSelectedAlpsClass}
        />
      </ClassManagementHeaderWrapper>
      <ClassManagementBodyWrapper>
        <ManageTypeTab
          push={pushNextUrl}
          match={match}
          manageType={manageType}
          onClickType={handleChangeType}
          selectedTypeKey={selectedTypeKey}
        />
        {/* managetype tab 기본 셀렉트는 learning progress management */}
        {/* renderManageType 함수 실행 */}
        {renderManageType()}
      </ClassManagementBodyWrapper>
    </ClassManagementWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  idToken: makeSelectIdToken(),
  user: makeSelectUserAccessGroup(),
  alpsClassList: makeSelectAlpsClassList(),
  alpsClassListLoading: makeSelectAlpsClassListLoading(),
  alpsClassStudentList: makeSelectAlpsClassStudentList(),
  alpsClassStudentListLoading: makeSelectAlpsClassStudentListLoading(),
});

const mapDispatchToProps = dispatch => ({
  fetchAlpsClassList: ({ idToken }) =>
    dispatch(fetchAlpsClassListRequestAction({ idToken })),
  pushNextUrl: nextUrl => dispatch(push(nextUrl)),
  fetchAlpsClassStudentList: ({ idToken, alpsClassId }) =>
    dispatch(
      fetchAlpsClassStudentListRequestionAction({
        idToken,
        alpsClassId,
      }),
    ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ClassManagementPage);

ClassManagementPage.propTypes = {
  match: PropTypes.object,
  idToken: PropTypes.string,
  pushNextUrl: PropTypes.func,
  fetchAlpsClassList: PropTypes.func,
  alpsClassList: PropTypes.array,
  alpsClassListLoading: PropTypes.bool,
  fetchAlpsClassStudentList: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
};
