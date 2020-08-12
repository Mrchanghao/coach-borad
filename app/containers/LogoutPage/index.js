import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { requestLogoutAction } from './actions';
import saga from './saga';

const key = 'logout';

const LogoutPage = ({ logout }) => {
  useInjectSaga({ key, saga });

  useEffect(() => {
    logout();
  }, []);
  return (
    <article>
      <div>
        <h1>로그아웃 되었습니다.</h1>
      </div>
    </article>
  );
};

LogoutPage.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(requestLogoutAction()),
});
const mapStateToProps = createStructuredSelector({});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(connected)(LogoutPage);
