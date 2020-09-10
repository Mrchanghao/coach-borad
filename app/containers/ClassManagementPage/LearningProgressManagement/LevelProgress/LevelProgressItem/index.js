import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import AnimateHeight from 'react-animate-height';
import { Radio, Icon } from 'semantic-ui-react';
import { ToggleArrow } from '../styles';
import UnitProgress from './UnitProgress';
import {
  LevelProgressWrapper,
  LevelWrapper,
  ProblemProgressWrapper,
  ProblemProgressP,
  ProblemProgressBar,
  ProblemProgressNum,
} from './styles';

function checkIsEmpty(progress) {
  if (_.isEmpty(progress)) {
    return true;
  }
  return false;
}

const LevelProgressItem = ({
  progress,
  openProblemProgress,
  filterProgress,
  handleRefresh,
}) => {
  const renderProblemProgress = progress => {
    if (checkIsEmpty(progress)) {
      return 0;
    }
    const result = progress.problem_progress;
    return Math.floor(result);
  };

  const renderVideoProgress = progress => {
    if (checkIsEmpty(progress)) {
      return 0;
    }
    const result = progress.video_progress;
    return Math.floor(result);
  };

  return (
    <Fragment>
      <LevelProgressWrapper
        id="ebe66d52e3d25c05bdba71cf778ad523"
        onClick={() => openProblemProgress({ sectionId: progress.id })}
        active={progress.isOpen}
        percent={renderProblemProgress(progress.progress)}
      >
        <LevelWrapper>{progress.title}</LevelWrapper>
        <ProblemProgressWrapper>
          <ProblemProgressP>문제 진행률</ProblemProgressP>
          <ProblemProgressNum>
            {renderProblemProgress(progress.progress)}%
          </ProblemProgressNum>
          <ProblemProgressBar
            size="tiny"
            disabled={renderProblemProgress(progress.progress) === 0}
            percent={renderProblemProgress(progress.progress)}
            indicating
          />
        </ProblemProgressWrapper>
        {/* 비디오 진행률  */}
      </LevelProgressWrapper>
    </Fragment>
  );
};

export default LevelProgressItem;
