import React, { Component } from 'react';

import { Table, Button, Input, Row, Col } from 'antd';
import axios from 'axios';

const columns = [{
  title: 'Username',
  dataIndex: 'username'
}, {
  title: 'Id',
  dataIndex: 'id'
}, {
  title: 'Fullname',
  dataIndex: 'fullname'
}];

let data = [];

export default class UsersTable extends Component {
  state = {
    selectedRowKeys: [],
    loading: false,
    inputValue : '',
    data : []
  };

  start = async () => {
    await this.setState({ loading: true });

    try{
      let rslt = await axios({
        method: 'get',
        url: 'http://localhost:3030/users'
      });
      console.log(rslt);
      data = rslt.data;
      await this.setState({
        data : rslt.data,
        loading: false,
      });
    }
    catch(err){
      console.log(err);
    }

  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  onInputChange = (e) => {
    this.setState({
      inputValue : e.target.value
    });
  }

  findItems =  () => {
    const reg = new RegExp( this.state.inputValue, 'gi');

    let newData = data.map( item => {
      const match = item.username.match(reg);
      if (!match) {
        return null;
      }
      return {
        ...item,
        username : (
          <span>
            {item.username.split(reg).map((text, i) => (
              i > 0 ? [<span key={item._id} style={{backgroundColor: '#dff0ff'}}>{match[0]}</span>, text] : text
            ))}
          </span>
        )
      };
    }).filter(item => !!item);

    this.setState({
      data : newData
    });
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
          <Row>
            <Col span={15}>
              <Button
                type="primary"
                onClick={this.start}
                loading={loading}>
                Reload
              </Button>
            </Col>
            <Col span={7}>
              <Input value={this.state.inputValue} onChange={this.onInputChange}></Input>
            </Col>
            <Col span={1} offset={1}>
              <Button type="primary" onClick={this.findItems}>Find</Button>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} rowKey={data => data._id} loading={this.state.loading} columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}
