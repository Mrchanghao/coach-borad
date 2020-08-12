import React from 'react';
import PropTypes from 'prop-types';
// immutable
// react-router things
import { Link } from 'react-router-dom';

import { MenuWrapper } from '../styles';
import MenuItem from './MenuItem';
import { menuConfig } from '../menuConfig';

const MenuList = ({ curPathname, idToken }) => (
  <MenuWrapper>
    {idToken && (
      <>
        <Link to={menuConfig.learn.link} style={{ textDecoration: 'none' }}>
          <MenuItem curPathname={curPathname} {...menuConfig.learn} />
        </Link>
        <Link to={menuConfig.result.link} style={{ textDecoration: 'none' }}>
          <MenuItem curPathname={curPathname} {...menuConfig.result} />
        </Link>
        <Link to={menuConfig.coach.link} style={{ textDecoration: 'none' }}>
          <MenuItem curPathname={curPathname} {...menuConfig.coach} />
        </Link>
      </>
    )}
  </MenuWrapper>
);

MenuList.propTypes = {
  curPathname: PropTypes.string,
  idToken: PropTypes.string,
};

export default MenuList;
