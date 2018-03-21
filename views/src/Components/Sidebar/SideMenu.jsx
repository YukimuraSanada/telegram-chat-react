import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
const { Item } = Menu;

import { connect } from 'react-redux';
import { selectMenuitem } from './SidebarActions';

const SideMenu = ({ sidebarStore, onHandleItem }) => {

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[sidebarStore.selectedItem]}
      onSelect={ (item) => onHandleItem(item.key)}>
      <Item key="1" >
        <Icon type="user-delete" />
        <span>Kick users</span>
      </Item>
      <Item key="2">
        <Icon type="table" />
        <span>Show all users</span>
      </Item>
    </Menu>
  );

};

const mapStateToProps = state => {
  return {
    sidebarStore : state.sidebarState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleItem : val => {
      dispatch(selectMenuitem(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
