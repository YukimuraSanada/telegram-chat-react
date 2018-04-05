import React from 'react';

import {  Button, Input, Row, Col, Icon, Select} from 'antd';
const Option = Select.Option;
import { connect } from 'react-redux';

import { loadingData, changeFindSelect, changeFindInput, filterData, onFindUsersAction } from './UserTableActions';

const SearchFormtable = ({
  isSelected,
  data,
  findBy,
  inputValue,
  loading,
  isSearchFromDisabled,
  selectedRowKeys,
  getData,
  changeFindInput,
  changeFindSelect,
  filterData,
  onFindUsers }) => {

  const handleFindSubmit = () => {
    onFindUsers({ inputValue, findBy, data });
  };

  return (
    <Row>
      <Col span={12}>
        <Button
          type="primary"
          onClick={getData}
          loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {isSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </Col>
      <Col span={3}>
        <Select
          style={{ width: '80%' }}
          value={findBy}
          onChange={changeFindSelect}>
          <Option value="username">Username</Option>
          <Option value="fullname">Full Name</Option>
        </Select>
      </Col>
      <Col span={7}>
        <Input value={inputValue} onChange={changeFindInput} disabled={isSearchFromDisabled}></Input>
      </Col>
      <Col span={1} style={{marginLeft:20}}>
        <Button type="primary" disabled={isSearchFromDisabled} onClick={handleFindSubmit}><Icon type="search" /></Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  data : state.userTableState.data,
  findBy : state.userTableState.findBy,
  inputValue : state.userTableState.inputValue,
  loading : state.userTableState.loading,
  isSearchFromDisabled : state.userTableState.isSearchFromDisabled,
  selectedRowKeys : state.userTableState.selectedRowKeys,
});

const mapDispatchToProps = dispatch => {
  return {
    getData : () => {
      dispatch(loadingData());
    },
    changeFindSelect : value => {
      dispatch(changeFindSelect(value));
    },
    changeFindInput : e => {
      dispatch(changeFindInput(e.target.value));
    },
    filterData : (data) => {
      dispatch(filterData(data));
    },
    onFindUsers : (query) => {
      dispatch(onFindUsersAction(query));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormtable);
