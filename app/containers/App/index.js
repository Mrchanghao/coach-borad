/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import TopNavigation from 'components/TopNavigation';
import SideNavigation from 'components/SideNavigation';
import LoginPage from 'containers/LoginPage';
import LogoutPage from 'containers/LogoutPage';
// action
import { fetchUserAction } from './actions';
// component
// saga
import saga from './saga';
// selectors
import { makeSelectFullName, makeSelectEmail } from './selectors';

import GlobalStyle from '../../global-styles';

const key = 'app';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const AppConentWrapper = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  height: calc(100% - 80px);
  width: calc(100% - 80px);
  position: fixed;
  top: 80px;
  left: 80px;
`;

function App({ email, fullName, onRefreshPage }) {
  useInjectSaga({ key, saga });
  //
  useEffect(() => {
    if (window.location.pathname !== '/logout') {
      onRefreshPage();
    }
  }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="COACH dash board clone"
      >
        <meta name="description" content="COACH dash board clone" />
      </Helmet>
      <TopNavigation email={email} fullname={fullName} />
      <SideNavigation />
      <AppConentWrapper>
        <Switch>
          <Route exact path="/" render={() => <h1>hi?</h1>} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
        </Switch>
        {/* <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/my-class/:manage" component={ClassManagementPage} />
          <Route path="" component={NotFoundPage} />
        </Switch> */}
      </AppConentWrapper>
      <GlobalStyle />
    </AppWrapper>
  );
}

const mapDispatchToProps = dispatch => ({
  onRefreshPage: () => {
    dispatch(fetchUserAction({}));
  },
});

App.propTypes = {
  onRefreshPage: PropTypes.func.isRequired,
  email: PropTypes.string,
  fullName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail,
  fullName: makeSelectFullName,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
