import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

export const renderScoreColor = props => {
  if (props.final && props.score === 100) {
    return props.theme.pointColor;
  }
  if (props.final && props.score !== 100) {
    return '#eea742';
  }
  return '#33aa33';
};

export const UnitTableWrapper = styled.div`
  /* display: inline-flex; */
  position: relative;
  width: 100%;
  height: fit-content;
  align-items: center;
  overflow-x: auto;
  padding: 20px 30px;
  background-color: #f3f3f3;
  ::-webkit-scrollbar {
    display: none !important;
  }

  ::-moz-scrollbar {
    display: none !important;
  }
  .ui.table thead th {
    white-space: pre !important;
  }
`;

export const UnitRefreshWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  margin: 10px 0;
  font-size: 13px;
  color: #a9a9a9;
  cursor: pointer;
`;

export const UnitTable = styled(Table)`
  width: 100%;
  /* margin: 20px 30px !important; */
  display: inline-table !important;
`;

export const UnitScoreWrapper = styled.div`
  display: block;
  flex-direction: column;
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const TableCell = styled(Table.Cell)`
  vertical-align: baseline;
`;

export const ScoreP = styled.p`
  color: ${props => renderScoreColor(props)};
  margin-bottom: 2px !important;
`;

export const ScoreDate = styled.p`
  color: #a9a9a9;
  font-size: 10px;
  margin: 0;
`;

export const NoneP = styled.p`
  color: ${props => props.theme.negativeColor};
`;
