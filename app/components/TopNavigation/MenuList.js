import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { MenuItem, MenuListWrapper } from './styles';

const MenuList = ({ email, fullName }) => {
  const displayName =
    fullName && `${fullName}`.length > 0 ? `${fullName} 코치 어서 오세여` : '';

  return (
    <MenuListWrapper>
      {email ? (
        <MenuItem>{displayName}</MenuItem>
      ) : (
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <MenuItem id="78c785fca3bf4bf44478ac2f1967568e" pointer>
            로그인
          </MenuItem>
        </Link>
      )}
      {email ? (
        <Link to="/logout" style={{ textDecoration: 'none' }}>
          <MenuItem pointer>로그아웃</MenuItem>
        </Link>
      ) : null}
    </MenuListWrapper>
  );
};

MenuList.propTypes = {
  email: PropTypes.string,
  fullName: PropTypes.string,
};

export default MenuList;
