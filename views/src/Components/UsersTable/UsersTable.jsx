import React, { PureComponent } from 'react';

import { Table } from 'antd';
import axios from 'axios';
import SearchFormtable from './SearhFormTable.jsx';

const columns = [{
  title: 'Username',
  dataIndex: 'username'
}, {
  title: 'Id',
  dataIndex: 'id'
}, {
  title: 'Full Name',
  dataIndex: 'fullname'
}];

let data = [];



export default class UsersTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    isLoading: true,
    inputValue : '',
    filteredData : [],
    findBy : 'Choose field',
    isSearchFromDisabled : true
  };

  getData = async () => {
    try{
      let rslt = await axios({
        method: 'get',
        url: 'http://localhost:3030/users'
      });
      console.log(rslt);
      data = rslt.data;
      await this.setState({
        filteredData : rslt.data,
        isLoading: false,
      });
    }
    catch(err){
      console.log(err);
    }
  };

  componentDidMount(){
    this.getData();
  }

  handleReload = async () => {
    await this.setState({
      isLoading: true,
      inputValue : '',
    });
    this.getData();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      selectedRowKeys
    });
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue : e.target.value
    });
  }

  handleFindChange = (value) => {
    this.setState({
      findBy : value,
      isSearchFromDisabled : false
    });
  }

  findItems =  () => {
    const reg = new RegExp( this.state.inputValue, 'gi');
    const { findBy } = this.state;
    let newData = data.map( item => {
      const match = item[findBy].match(reg);
      if (!match) {
        return null;
      }

      if (findBy == 'username'){
        return {
          ...item,
          username : (
            <span>
              {item[findBy].split(reg).map((text, i) => (
                i > 0 ? [<span key={item._id} style={{backgroundColor: '#dff0ff'}}>{match[0]}</span>, text] : text
              ))}
            </span>
          )
        };
      }
      else {
        return {
          ...item,
          fullname : (
            <span>
              {item[findBy].split(reg).map((text, i) => (
                i > 0 ? [<span key={item._id} style={{backgroundColor: '#dff0ff'}}>{match[0]}</span>, text] : text
              ))}
            </span>
          )
        };
      }

    }).filter(item => !!item);

    this.setState({
      filteredData : newData
    });
  }

  render() {
    const { isLoading, selectedRowKeys, inputValue, findBy, isSearchFromDisabled } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <SearchFormtable
            searchFromDisabled = {isSearchFromDisabled}
            selectedRowKeys = {selectedRowKeys}
            loading = {isLoading}
            inputValue={inputValue}
            findBy={findBy}
            onFind={this.findItems}
            onReload={this.handleReload}
            onInputChange={this.handleInputChange}
            onFindChange={this.handleFindChange}
          />
        </div>
        <Table rowSelection={rowSelection}  rowKey={data => data._id} loading={this.state.isLoading} columns={columns} dataSource={this.state.filteredData} />
      </div>
    );
  }
}
