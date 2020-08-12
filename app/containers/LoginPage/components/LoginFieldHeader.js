import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo_alps.svg';
import {
  LoginFieldHeaderWrapper,
  LogoWrapper,
  MsgWrapper,
  MsgFirst,
  MsgSecond,
} from './styles';

const LoginFieldHeader = () => (
  <LoginFieldHeaderWrapper>
    <LogoWrapper>
      <Link to="/">
        <img src={Logo} alt="알프스" />
      </Link>
    </LogoWrapper>
    <MsgWrapper>
      <MsgFirst id="9f06d627c8e4011e370faca7036dd6e5">로그인</MsgFirst>
      <MsgSecond>어서오세요 코치님들</MsgSecond>
    </MsgWrapper>
  </LoginFieldHeaderWrapper>
);

export default LoginFieldHeader;
