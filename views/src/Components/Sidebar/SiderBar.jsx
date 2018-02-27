import React, { Component } from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

import SideMenu from './SideMenu.jsx';

const SideBar = (props) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.isCollapsed}>
      <div className="logo" />
      <SideMenu selectedItem={props.selectedItem} onHandleItem={props.onHandleSelect}/>
    </Sider>
  );
};

export default SideBar;
