import styled from 'styled-components';
// import React from 'react';

export const Wrapper = styled.div`
  border-bottom: 2px solid ${props => props.theme.topNaviBorderColor};
  background: ${props => props.theme.topNaviBackgroundColor};
  top: 0;
  height: 80px;
  width: 100%;
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuListWrapper = styled.ul`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 60px;
  padding: 0px;
`;

export const MenuItem = styled.li`
  display: inline-block;
  margin: 0 16px 0 16px;
  height: 24px;
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  color: ${props => props.theme.mainColor};
`;

export const LogoImg = styled.img`
  width: 100%;
  margin: 0 auto;
  display: block;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 40px;
  cursor: pointer;
  align-items: center;
`;
