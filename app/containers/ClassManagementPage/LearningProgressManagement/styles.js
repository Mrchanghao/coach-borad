import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export const renderPercentColor = props => {
  const { percent } = props;
  if (percent >= 90 && percent <= 100) {
    return props.theme.pointColor;
  }
  if (percent >= 80 && percent < 90) {
    return '#eea741';
  }
  if (percent === 0) {
    return '#a9a9a9';
  }
  return '#a9a9a9';
};

export const Wrapper = styled.div`
  margin: 15px 0;
  display: inline-flex;
  height: calc(100% - 60px); /* 60px => manageTypeTab height */
  flex-direction: column;
  z-index: 0;
`;

export const ArrowIcon = styled(Icon)`
  color: #a9a9a9;
`;

export const StepWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
`;

export const StepItem = styled.div`
  font-size: 16px;
  margin-right: 5px;
  font-weight: bold;
  color: ${props => (props.active ? props.theme.pointColor : '#c5c5c5')};
`;

export const LoadingWrapper = styled.div`
  display: inline-flex;
  width: ${props => (props.full ? '100%' : 'auto')};
  height: 100%;
  flex-direction: row;
  justify-content: ${props => (props.full ? 'center' : 'flex-start')};
  align-items: center;
`;

export const LoadingText = styled.p`
  color: #a9a9a9;
  margin-right: 10px;
  margin-bottom: 1px;
`;
