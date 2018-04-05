import React, { PureComponent } from 'react';

import { Table } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

import { selectTableFields, loadingData } from './UserTableActions';
import SearchFormtable from './SearhFormTable';

class UsersTable extends PureComponent {

  componentDidMount(){
    this.props.getData();
  }

  render() {
    const { isLoading, columns, filteredData, selectedRowKeys, onSelectFields } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectFields,
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
          loading={isLoading}
          columns={columns}
          dataSource={filteredData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading : state.userTableState.isLoading ,
  columns : state.userTableState.columns ,
  filteredData : state.userTableState.filteredData ,
  selectedRowKeys : state.userTableState.selectedRowKeys ,
});

const mapDispatchToProps = dispatch => ({
  onSelectFields : (selectedRowKeys) => {
    dispatch(selectTableFields(selectedRowKeys));
  },
  getData : () => {
    dispatch(loadingData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
