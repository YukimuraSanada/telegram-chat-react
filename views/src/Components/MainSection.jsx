import React, { Component } from 'react';

import { Layout } from 'antd';

import CustomHeader from './CustomHeader.jsx';
import KickForm from './KickForm/KickForm.jsx';
import UsersTable from './UsersTable/UsersTable.jsx';
const { Content } = Layout;

import { connect } from 'react-redux';

const MainSection = (props) => {

  const { collapsed, selectedItem } = props.sidebarStore;
  return (
    <Layout>
      <CustomHeader collapsed={collapsed} />
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        {selectedItem == 1 ? <KickForm /> :
          selectedItem == 2 ? <UsersTable /> : null}
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    sidebarStore : state.pageReducer
  };
};

export default connect(mapStateToProps)(MainSection);
