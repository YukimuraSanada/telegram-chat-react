import React, { Component } from 'react';

import { Layout, Icon } from 'antd';

const { Header } = Layout;

const CustomHeader = (props) => {
  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Icon
        style={{paddingLeft : 30}}
        type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={props.onToggle}
      />
    </Header>
  );
};

export default CustomHeader;
