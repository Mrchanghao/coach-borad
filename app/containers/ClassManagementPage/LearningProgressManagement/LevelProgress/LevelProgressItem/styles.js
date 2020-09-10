import styled from 'styled-components';
import { Accordion, Progress } from 'semantic-ui-react';
import { renderPercentColor } from '../../styles';

export const LevelProgressWrapper = styled(Accordion.Title)`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  box-shadow: 3px 2px 4px 0 rgba(0, 0, 0, 0.14);
  margin-bottom: 10px;
  border: 1px solid
    ${props => (props.active ? props.theme.pointColor : '#ffffff')};
  cursor: pointer;
  &:hover {
    transition: 0.3s ease-out all;
    border-color: ${props => renderPercentColor(props)};
  }
`;

export const LevelWrapper = styled.div`
  display: inline-flex;
  width: 10%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const ProblemProgressWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 35%;
  height: 100%;
  align-items: center;
  padding: 0 10px;
`;

export const ProblemProgressP = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  color: ${props => props.theme.mainColor};
  text-align: center;
  width: 20%;
`;

export const ProblemProgressNum = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  color: ${props => renderPercentColor(props)} !important;
  text-align: center;
  width: 10%;
`;

export const ProblemProgressBar = styled(Progress)`
  width: 70%;
  margin: 10px !important;
  .bar {
    background-color: ${props => renderPercentColor(props)} !important;
    .progress {
      display: none;
    }
  }
`;

export const VideoProgressWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 35%;
  height: 100%;
  align-items: center;
  padding: 0 10px;
`;

export const VideoProgressP = styled.p`
  margin-bottom: 0;
  text-align: center;
  width: 20%;
`;

export const VideoProgressNum = styled.p`
  font-weight: bold;
  color: ${props => renderPercentColor(props)} !important;
  margin-bottom: 0;
  text-align: center;
  width: 10%;
`;

export const VideoProgressBar = styled(Progress)`
  width: 80%;
  margin: 10px !important;
  .bar {
    background-color: ${props => renderPercentColor(props)} !important;
    .progress {
      display: none;
    }
  }
`;

export const SettingWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const RadioToggleWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  .ui.slider.checkbox input:focus:checked ~ .box:before,
  .ui.slider.checkbox input:focus:checked ~ label:before {
    background-color: ${props => props.theme.pointColor} !important;
  }

  .ui.slider.checkbox input:checked ~ .box:before,
  .ui.slider.checkbox input:checked ~ label:before {
    background-color: ${props => props.theme.pointColor} !important;
  }

  .ui.slider.checkbox input ~ .box:before,
  .ui.slider.checkbox input ~ label:before {
    background-color: ${props => props.theme.grayColor} !important;
  }
`;

export const ToggleP = styled.p`
  margin-right: 10px;
  margin-bottom: 0;
  font-weight: bold;
  color: ${props => props.theme.pointColor};
`;
