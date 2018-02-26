import React, { Component } from 'react';

import { Table, Button } from 'antd';
import axios from 'axios';

const columns = [{
  title: 'Username',
  dataIndex: 'username',
}, {
  title: 'Id',
  dataIndex: 'id',
}, {
  title: 'Fullname',
  dataIndex: 'fullname',
}];

let data = [];

export default class UsersTable extends Component {
  state = {
    selectedRowKeys: [],
    loading: false,
  };

  start = async () => {
    await this.setState({ loading: true });

    try{
      let rslt = await axios({
        method: 'get',
        url: '/users',
      });
      console.log(rslt);
      data = rslt.data;
    }
    catch(err){
      console.log(err);
    }

    await this.setState({
      loading: false,
    });

  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            loading={loading}>
            Reload
          </Button>
        </div>
        <Table rowSelection={rowSelection} loading={this.state.loading} columns={columns} dataSource={data} />
      </div>
    );
  }
}
