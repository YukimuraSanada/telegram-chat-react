import React, { Component } from 'react';

import { Layout } from 'antd';
const { Content } = Layout;
import { connect } from 'react-redux';
import { Route, withRouter  } from 'react-router-dom';

import CustomHeader from 'Components/CustomHeader';
import KickForm from 'Components/KickForm/KickForm';
import UsersTable from 'Components/UsersTable/UsersTable';

const MainSection = ({ collapsed }) => {

  return (
    <Layout>
      <CustomHeader collapsed={collapsed} />
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        <Route exact path='/' component={KickForm}/>
        <Route path='/userstable' component={UsersTable}/>
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => (
  { collapsed : state.sidebarState.collapsed }
);

export default withRouter(connect(mapStateToProps)(MainSection));
