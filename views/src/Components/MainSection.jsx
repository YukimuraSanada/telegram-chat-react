import React, { Component } from 'react';

import { Layout } from 'antd';

import CustomHeader from './CustomHeader.jsx';
import KickForm from './KickForm.jsx';


const { Content } = Layout;


const MainSection = (props) => {
  return (
    <Layout>
      <CustomHeader onToggle={props.onHandleToggle} collapsed={props.isCollapsed} />
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        {props.selectedItem == 1 ? <KickForm /> : <h1>TODO this</h1>}        
      </Content>
    </Layout>
  );
};

export default MainSection;
