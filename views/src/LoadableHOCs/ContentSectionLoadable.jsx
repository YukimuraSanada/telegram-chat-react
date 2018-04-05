import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div></div>;

const ContentSectionLoadable = Loadable({
  loader: () => import('Components/ContentSection'),
  loading: Loading,
});

export default ContentSectionLoadable;
