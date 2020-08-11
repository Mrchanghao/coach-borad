import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuList from './MenuList';
import { Wrapper, LogoWrapper, LogoImg } from './styles';
import Logo from './logo_blue.png';

const Navigation = ({ email, fullName }) => (
  <Wrapper>
    <LogoWrapper>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <LogoImg src={Logo} alt="로고" />
      </Link>
    </LogoWrapper>
    <MenuList email={email} fullName={fullName} />
  </Wrapper>
);

Navigation.propTypes = {
  email: PropTypes.string,
  fullName: PropTypes.string,
};

export default Navigation;
