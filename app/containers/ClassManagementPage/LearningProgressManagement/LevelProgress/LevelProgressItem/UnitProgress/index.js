import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Squares } from 'react-activity';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Table } from 'semantic-ui-react';
import { RefreshIcon } from 'components/RefreshIcon';
import {
  UnitTableWrapper,
  ScoreP,
  ScoreDate,
  TableCell,
  UnitScoreWrapper,
  UnitTable,
  UnitRefreshWrapper,
  NoneP,
} from './styles';

import {
  makeSelectUnitProgress,
  makeSelectUnitProgressLoading,
} from '../../../selectors';

import { LoadingWrapper } from '../../../styles';

const UnitProgress = ({ unitProgress, unitProgressLoading, handleRefresh }) => {
  const renderUnitProgress = unit => {
    const submissionSize = unit.submissions.length;
    const vodProgress = unit.vod_progress.progress;

    if (submissionSize && !vodProgress) {
      return (
        <Fragment>
          {unit.submissions.map(submission => (
            <UnitScoreWrapper key={`unit-progress-submission-${submission.id}`}>
              <ScoreP final={submission.is_arch_final} score={submission.score}>
                {submission.score}점
              </ScoreP>
              <ScoreDate>
                {moment(submission.updated).format('YY/MM/DD')}
              </ScoreDate>
            </UnitScoreWrapper>
          ))}
        </Fragment>
      );
    }

    if (vodProgress && !submissionSize) {
      return <p>{vodProgress}%</p>;
    }
    return <NoneP>미학습</NoneP>;
  };

  return (
    <Fragment>
      <UnitTableWrapper>
        {unitProgressLoading ? (
          <LoadingWrapper full>
            <Squares color="#a9a9a9" size={25} speed={1} />
          </LoadingWrapper>
        ) : (
          <UnitTable>
            <Table.Header>
              <Table.Row>
                {unitProgress.map(data => (
                  <Table.HeaderCell key={`unit-title-${data.id}`}>
                    {data.unit.title}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {unitProgress.map(unit => (
                  <TableCell singleLine key={`unit-progress-${unit.id}`}>
                    {renderUnitProgress(unit)}
                  </TableCell>
                ))}
              </Table.Row>
            </Table.Body>
          </UnitTable>
        )}
        <UnitRefreshWrapper onClick={handleRefresh}>
          정보 새로고침
          <RefreshIcon refreshing={unitProgressLoading} />
        </UnitRefreshWrapper>
      </UnitTableWrapper>
    </Fragment>
  );
};

UnitProgress.propTypes = {
  unitProgress: PropTypes.array,
  unitProgressLoading: PropTypes.bool,
  handleRefresh: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  unitProgress: makeSelectUnitProgress(),
  unitProgressLoading: makeSelectUnitProgressLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(UnitProgress);
