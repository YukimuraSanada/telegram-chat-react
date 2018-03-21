import React, { PureComponent } from 'react';

import { Table } from 'antd';
import axios from 'axios';
import SearchFormtable from './SearhFormTable.jsx';

import { connect } from 'react-redux';
import { selectTableFields, loadingData } from './UserTableActions';

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

class UsersTable extends PureComponent {
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
    // this.setState({
    //   selectedRowKeys
    // });
    this.props.onSelectFields(selectedRowKeys);
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
    const { findBy, inputValue } = this.state;
    const reg = new RegExp( inputValue, 'gi');
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
    const { isLoading, inputValue, findBy, isSearchFromDisabled } = this.state;
    console.log(this.props.userTableStore.selectedRowKeys);
    const selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const isSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <SearchFormtable
            isSelected={isSelected}
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
        <Table rowSelection={rowSelection}  rowKey={data => data._id} loading={this.props.userTableStore.isLoading} columns={columns} dataSource={this.state.filteredData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRowKeys : state.userTableReducer.selectedRowKeys,
    userTableStore : state.userTableReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectFields : (val) => {
      dispatch(selectTableFields(val));
    },
    getData : () => {
      dispatch(loadingData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
