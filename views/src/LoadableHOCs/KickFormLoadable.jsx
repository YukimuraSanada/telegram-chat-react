import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const Loading = () => <Spin />;

const KickFormLoadable = Loadable({
  loader: () => import('Components/KickForm/KickForm'),
  loading: Loading,
});

export default KickFormLoadable;
