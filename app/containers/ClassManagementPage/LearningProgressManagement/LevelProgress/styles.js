import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px); /* 30px => StepWrapper height */
  margin-top: 10px;
  overflow: auto;
`;

export const InfoWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  height: 40px;
  align-items: center;
  padding-right: 2%;
  justify-content: space-between;
`;

export const StudentCourseWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

export const LevelRefreshWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  color: #a9a9a9;
  cursor: pointer;
`;

export const StudentP = styled.p`
  color: ${props => props.theme.mainColor};
  margin-right: 10px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 18px;
`;

export const BodyWrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: auto;
  padding-top: 10px;
  padding-right: 2%;
`;

export const ToggleArrow = styled.div`
  display: inline-flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  color: ${props => (props.click ? '#333333' : props.theme.grayColor)};
  &:hover {
    transition: color 0.3s ease-in-out;
    color: ${props => props.theme.pointColor};
  }
`;
