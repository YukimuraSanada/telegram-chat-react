import React from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

import { connect } from 'react-redux';

import SideMenu from './SideMenu';

const SideBar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <SideMenu/>
    </Sider>
  );
};

const mapStateToProps = state => (
  { collapsed : state.sidebarState.collapsed }
);

export default connect(mapStateToProps)(SideBar);
