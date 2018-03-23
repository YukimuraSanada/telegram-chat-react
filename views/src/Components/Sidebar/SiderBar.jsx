import React from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

import { connect } from 'react-redux';

import SideMenu from './SideMenu.jsx';

const SideBar = ({ sidebarStore : { collapsed } }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <SideMenu/>
    </Sider>
  );
};

const mapStateToProps = state => ({ sidebarStore : state.sidebarState });

export default connect(mapStateToProps)(SideBar);
