import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuList from './MenuList';
import { Wrapper, LogoWrapper, LogoImg, LogoText } from './styles';
import Logo from './Logo_alps.svg';

const Navigation = ({ email, fullName }) => (
  <Wrapper>
    <LogoWrapper>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <LogoImg src={Logo} alt="로고" />
      </Link>
      <LogoText>Coach</LogoText>
    </LogoWrapper>
    <MenuList email={email} fullName={fullName} />
  </Wrapper>
);

Navigation.propTypes = {
  email: PropTypes.string,
  fullName: PropTypes.string,
};

export default Navigation;
