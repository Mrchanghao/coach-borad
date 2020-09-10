import React, { memo } from 'react';
import PropTypes from 'prop-types';

// redux things
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { Route, withRouter, Switch } from 'react-router-dom';
import { makeSelectIdToken } from 'containers/App/selectors';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducers';
import { Wrapper, StepWrapper, StepItem, ArrowIcon } from './styles';
import CourseProgress from './CourseProgress';
import LevelProgress from './LevelProgress';

const key = 'learningProgress';

const LearningProgressManagement = ({ match, selectedAlpsClass }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const parsePathname = name => {
    const { pathname } = window.location;
    const splited = pathname.split('/');
    const type = splited[3];
    return type === name;
  };

  return (
    <Wrapper>
      <StepWrapper>
        <StepItem active={parsePathname('course')}>코스 현황</StepItem>
        <ArrowIcon name="chevron right" />
        <StepItem active={parsePathname('level')}>레벨 현황</StepItem>
      </StepWrapper>
      <Switch>
        <Route
          exact
          path={`${match.url}/course`}
          render={() => (
            <CourseProgress selectedAlpsClass={selectedAlpsClass} />
          )}
        />
        <Route
          path={`${match.url}.level`}
          render={() => <LevelProgress selectedAlpsClass={selectedAlpsClass} />}
        />
      </Switch>
    </Wrapper>
  );
};

LearningProgressManagement.propTypes = {
  match: PropTypes.object,
  selectedAlpsClass: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  pushUrl: nextUrl => dispatch(push(nextUrl)),
});

const mapStateToProps = createStructuredSelector({
  idToken: makeSelectIdToken(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(LearningProgressManagement);
