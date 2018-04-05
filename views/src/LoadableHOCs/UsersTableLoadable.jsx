import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd'

const Loading = () => <Spin />;

const UsersTableLoadable = Loadable({
  loader: () => import('Components/UsersTable/UsersTable'),
  loading: Loading,
});

export default UsersTableLoadable;
