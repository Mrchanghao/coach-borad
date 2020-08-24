import React from 'react';

// Prop-types
import PropTypes from 'prop-types';

// immutable

// react-router-dom
import { withRouter } from 'react-router-dom';
import {
  TabWrapper,
  TabItemWrapper,
  TabItem,
  TabButtonWrapper,
  TabButton,
} from './ManageTabStyle';

const ManageTypeTab = props => {
  const { manageType, onClickType, selectedTypeKey, match, push } = props;

  return (
    <TabWrapper>
      <TabItemWrapper>
        <TabItem
          onClick={() => push('/my-class/learning-progress/course')}
          styleKey={match.params.manageType}
        >
          진도현황
        </TabItem>
        <TabItem
          onClick={() => push('/my-class/student')}
          styleKey={match.params.manageType}
        >
          학생관리
        </TabItem>
        <TabItem
          onClick={() => push('/my-class/submission')}
          styleKey={match.params.manageType}
        >
          제출관리
        </TabItem>
      </TabItemWrapper>
      {match.params.manageType === 'student' ? (
        <TabButtonWrapper>
          {manageType.map(data => (
            <TabButton
              key={data.key}
              styleKey={data.key}
              selectedTypeKey={selectedTypeKey}
              onClick={() => onClickType(data.key, data.title)}
            >
              {data.title}
            </TabButton>
          ))}
        </TabButtonWrapper>
      ) : null}
    </TabWrapper>
  );
};

export default withRouter(ManageTypeTab);

ManageTypeTab.propTypes = {
  match: PropTypes.object,
  push: PropTypes.func,
  manageType: PropTypes.array.isRequired,
  onClickType: PropTypes.func.isRequired,
  selectedTypeKey: PropTypes.string.isRequired,
};
