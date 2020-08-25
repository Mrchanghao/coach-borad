import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const RefreshIcon = ({ onClick, refreshing }) => (
  <Wrapper onClick={onClick}>
    <StyledRefreshIcon refreshing={refreshing.toString()} name="redo" />
  </Wrapper>
);

RefreshIcon.propTypes = {
  onClick: PropTypes.func,
  refreshing: PropTypes.bool.isRequired,
};

export default RefreshIcon;

const Wrapper = styled.div`
  display: inline-block;
  margin: 0 5px 10px;
  cursor: pointer;
`;

const StyledRefreshIcon = styled(Icon)`
  animation: ${props =>
    props.refreshing === 'true' ? 'rotating 2s linear infinite' : 'none'};
`;
