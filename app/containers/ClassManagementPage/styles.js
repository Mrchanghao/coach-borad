import styled from 'styled-components';

export const TabItemH1 = styled.h1`
  position: relative;
  margin: 0;
`;

export const ClassManagementWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ClassManagementHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  height: 60px;
`;

export const ClassManagementBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 50px 0px 50px;
  border-top: 1px #cccccc solid;
  height: calc(
    100% - 55px
  ); /* CoachTopNavigation(50px) + ClassManagementHeaderWrapper(55px) Height */
`;
