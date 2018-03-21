import React, { Component } from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

import SideMenu from './SideMenu.jsx';

import { connect } from 'react-redux';

const SideBar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div className="logo" />
      <SideMenu />
    </Sider>
  );
};

const mapStateToProps = state => {
  return {
    collapsed : state.sidebarState.collapsed
  };
};

export default connect(mapStateToProps)(SideBar);
