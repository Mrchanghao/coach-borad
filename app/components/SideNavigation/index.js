import React from 'react';
import PropTypes from 'prop-types';
// reselect
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RELEASE_VERSION } from 'utils/constants';

import {
  makeSelectUserAccessGroup,
  makeSelectIdToken,
  makeSelectPathName,
} from 'containers/App/selectors';
import { Wrapper } from './styles';
import MenuList from './Menu/MenuList';

const SideNavigation = ({ accessGroup, curPathname, idToken }) => {
  console.log(accessGroup, idToken);
  return (
    <Wrapper>
      <MenuList
        accessGroup={accessGroup}
        curPathname={curPathname}
        idToken={idToken}
      />
      <div
        style={{
          display: 'flex',
          marginBottom: 8,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#aaaaaa',
          fontSize: '10px',
        }}
      >
        <p style={{ margin: 0 }}>© Algorithm</p>
        <p style={{ marginBottom: 5 }}>LABS</p>
        <p>{RELEASE_VERSION}</p>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  accessGroup: makeSelectUserAccessGroup(),
  curPathname: makeSelectPathName(),
  idToken: makeSelectIdToken(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(SideNavigation);

SideNavigation.propTypes = {
  accessGroup: PropTypes.string,
  curPathname: PropTypes.string,
  idToken: PropTypes.string,
};

/*
- side navigation 
  - index
  - component
  - styles
  
*/
