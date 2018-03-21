import React, { PureComponent } from 'react';

import { Table } from 'antd';
import axios from 'axios';
import SearchFormtable from './SearhFormTable.jsx';

import { connect } from 'react-redux';
import { selectTableFields, loadingData } from './UserTableActions';


class UsersTable extends PureComponent {

  columns = [{
    title: 'Username',
    dataIndex: 'username'
  }, {
    title: 'Id',
    dataIndex: 'id'
  }, {
    title: 'Full Name',
    dataIndex: 'fullname'
  }];

  componentDidMount(){
    this.props.getData();
  }

  onRowsSelect = (selectedRowKeys) => {
    this.props.onSelectFields(selectedRowKeys);
  }


  render() {
    const { selectedRowKeys, userTableStore } = this.props;
    // const selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onRowsSelect,
    };
    const isSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <SearchFormtable isSelected={isSelected}/>
        </div>
        <Table
          rowSelection={rowSelection}
          rowKey={data => data._id}
          loading={userTableStore.isLoading}
          columns={this.columns}
          dataSource={userTableStore.filteredData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRowKeys : state.userTableState.selectedRowKeys,
    data : state.userTableState.data,
    userTableStore : state.userTableState
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
