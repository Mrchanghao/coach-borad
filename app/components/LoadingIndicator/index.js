import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { BeatLoader } from 'react-spinners';
import Wrapper from './Wrapper';

const CircularLoadingIndicator = ({ size, inverted }) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  return (
    <Wrapper>
      <BeatLoader
        size={size}
        color={inverted ? '#ffffff' : '#293b5a'}
        loading={loading}
      />
    </Wrapper>
  );
};

CircularLoadingIndicator.propTypes = {
  size: PropTypes.number.isRequired,
  inverted: PropTypes.bool,
};

export default CircularLoadingIndicator;
