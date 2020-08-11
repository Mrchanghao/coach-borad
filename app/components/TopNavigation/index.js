import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

const TopNavigation = ({ email, fullName }) => (
  <Navigation email={email} fullName={fullName} />
);

TopNavigation.propTypes = {
  email: PropTypes.string,
  fullName: PropTypes.string,
};

export default TopNavigation;
