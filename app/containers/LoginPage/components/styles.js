import styled from 'styled-components';

export const LoginFieldHeaderWrapper = styled.div`
  margin: 0;
  display: flex;
`;

export const LogoWrapper = styled.div`
  margin: 0;
  width: 70px;
  height: 68px;
  left: -38px;
  position: relative;
  display: inline-block;
`;

export const MsgFirst = styled.h1`
  font-size: 36px;
  color: ${props => props.theme.textColor};
  font-weight: 500;
`;

export const MsgSecond = styled.p`
  font-size: 16px;
  color: rgba(168, 168, 168, 1);
`;

export const MsgWrapper = styled.div`
  margin: 0;
  width: 330px;
  height: 70px;
  left: -18px;
  position: relative;
  display: inline-block;
`;
