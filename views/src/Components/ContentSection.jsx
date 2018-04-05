import React, { Component } from 'react';

import { Layout, Spin } from 'antd';
const { Content } = Layout;
import { connect } from 'react-redux';
import { Route, withRouter  } from 'react-router-dom';

import CustomHeader from 'Components/CustomHeader';
import KickFormLoadable from 'src/LoadableHOCs/KickFormLoadable';
import UsersTableLoadable from 'src/LoadableHOCs/UsersTableLoadable';


const ContentSection = ({ collapsed }) => {

  return (
    <Layout>
      <CustomHeader collapsed={collapsed} />
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        <Route exact path='/' component={KickFormLoadable}/>
        <Route path='/userstable' component={UsersTableLoadable}/>
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => ({
  collapsed : state.sidebarState.collapsed
});

export default withRouter(connect(mapStateToProps)(ContentSection));
