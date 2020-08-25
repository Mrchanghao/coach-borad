import styled from 'styled-components';
import { Progress } from 'semantic-ui-react';

import { renderPercentColor } from '../styles';

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 40px); /* 30px => StepWrapper height */
  margin-top: 10px;
`;

export const FilterWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;
`;

export const TableFooter = styled.div`
  display: inline-flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;
export const TH = styled.div`
  display: inline-flex;
  height: 100%;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: white;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  flex: 1;
  justify-content: center;
`;
export const CourseProgressTableWrapper = styled.div`
  width: 100%;
  /* 상단 검색필터 40px, 하단 안내문구 40px */
  height: calc(100% - 80px);
`;

export const CourseProgressTableHeaderWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: inline-flex;
`;
export const CourseProgressTableBodyWrapper = styled.div`
  height: calc(100% - 40px);
  overflow: auto;
`;
export const CourseProgressTableBodyRowWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
`;
export const CourseProgressTableBodyRowNameWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  text-align: center;
  flex: 1;
`;
export const CourseProgressTableBodyRowEmailWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 2;
`;
export const CourseWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const LearningProgressWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 5px;
  padding: 5px 10px;
  align-items: center;
  box-shadow: 3px 2px 4px 0 rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    border-color: ${props => renderPercentColor(props)};
  }
`;

export const CourseP = styled.p`
  margin: 0;
  width: 20%;
  margin-right: 10px;
  color: ${props => props.theme.mainColor};
  cursor: pointer;
`;

export const LearningProgressNum = styled.div`
  width: 10%;
  color: ${props => renderPercentColor(props)};
  margin-right: 5px;
`;
export const LearningProgress = styled(Progress)`
  width: 70%;
  margin: 10px !important;
  .bar {
    background-color: ${props => renderPercentColor(props)} !important;
    .progress {
      display: none;
    }
  }
`;
