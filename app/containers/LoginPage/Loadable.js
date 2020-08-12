import React from 'react';
import loadable from 'utils/loadable';
import CircularLoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <CircularLoadingIndicator size={10} inverted />,
});
