import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';

const RememberDiv = () => (
  <RememberWrapper>
    <RememberRegisterWrapper>
      <Link to="/forgot-password">
        <ForgotText>비밀번호를 잊으셨으여?</ForgotText>
      </Link>
      <Link to="/register">
        <RegisterText>가입하기</RegisterText>
      </Link>
    </RememberRegisterWrapper>
  </RememberWrapper>
);

export default RememberDiv;

const RememberRegisterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const RegisterText = styled.div`
  color: ${props => props.theme.textColor};
`;

export const ForgotText = styled.div`
  color: ${props => props.theme.pointColor};
`;

export const RememberCheckBoxWrapper = styled.div`
  top: 16px;
  width: 50%;
  position: relative;
  float: left;
`;

const RememberWrapper = styled.div`
  width: 384px;
  height: 62px;
  display: flex;
  align-items: center;
  margin: auto;
`;
