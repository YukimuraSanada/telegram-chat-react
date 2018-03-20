import React, { Component } from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

import SideMenu from './SideMenu.jsx';

import { connect } from 'react-redux';

const SideBar = (props) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.sidebarStore.collapsed}>
      <div className="logo" />
      <SideMenu />
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarStore : state.pageReducer
  };
};

export default connect(mapStateToProps)(SideBar);
