import React, { Component } from 'react';

import { Layout, Icon } from 'antd';

const { Header } = Layout;

const CustomHeader = (props) => {
  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <div style={{paddingLeft : 30}}>
        <Icon
          type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={props.onToggle}
        />
      </div>
    </Header>
  );
};

export default CustomHeader;
