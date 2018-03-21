import React from 'react';

import { Layout } from 'antd';
const { Sider } = Layout;

import SideMenu from './SideMenu.jsx';

import { connect } from 'react-redux';
import { selectMenuitem } from './SidebarActions';

const SideBar = ({ sidebarStore : { collapsed, selectedItem }, onHandleItem }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div className="logo" />
      <SideMenu selectedItem={selectedItem} onHandleItem={onHandleItem}/>
    </Sider>
  );
};

const mapStateToProps = state => ({ sidebarStore : state.sidebarState });

const mapDispatchToProps = dispatch => {
  return {
    onHandleItem : val => {
      dispatch(selectMenuitem(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
