import React from 'react';
import PropTypes from 'prop-types';
// reselect
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  makeSelectUserAccessGroup,
  makeSelectIdToken,
  makeSelectPathName,
} from 'containers/App/selectors';
import { Wrapper } from './styles';
import MenuList from './Menu/MenuList';

const SideNavigation = ({ accessGroup, curPathname, idToken }) => (
  <Wrapper>
    <MenuList
      accessGroup={accessGroup}
      curPathname={curPathname}
      idToken={idToken}
    />
  </Wrapper>
);

const mapStateToProps = createStructuredSelector({
  accessGroup: makeSelectUserAccessGroup(),
  idToken: makeSelectIdToken(),
  curPathname: makeSelectPathName(),
});

export default compose(
  connect(
    mapStateToProps,
    null,
  )(SideNavigation),
);

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
