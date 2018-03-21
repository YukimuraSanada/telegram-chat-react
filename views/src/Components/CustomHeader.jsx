import React, { Component } from 'react';

import { Layout, Icon } from 'antd';

const { Header } = Layout;

import { connect } from 'react-redux';
import { toggleSidebar } from './Sidebar/SidebarActions';


const CustomHeader = ({ sidebarStore, onToggle }) => {

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <div style={{paddingLeft : 30}}>
        <Icon
          type={sidebarStore.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onToggle}
        />
      </div>
    </Header>
  );
};

const mapStateToProps = state => ({ sidebarStore : state.sidebarState });

const mapDispatchToProps = dispatch => {
  return {
    onToggle : () => {
      dispatch(toggleSidebar());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
