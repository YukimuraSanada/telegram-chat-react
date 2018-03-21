import React from 'react';

import {  Button, Input, Row, Col, Icon, Select} from 'antd';
const Option = Select.Option;

import { connect } from 'react-redux';

const SearchFormtable = (props) => {

  const { onReload, loading, findBy, onFindChange, inputValue, onInputChange, onFind, searchFromDisabled, selectedRowKeys } = props;

  return (
    <Row>
      <Col span={12}>
        <Button
          type="primary"
          onClick={onReload}
          loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {props.isSelected ? `Selected ${props.selectedRowKeys.length} items` : ''}
        </span>
      </Col>
      <Col span={3}>
        <Select
          style={{ width: '80%' }}
          value={findBy}
          onChange={onFindChange}>
          <Option value="username">Username</Option>
          <Option value="fullname">Full Name</Option>
        </Select>
      </Col>
      <Col span={7}>
        <Input value={inputValue} onChange={onInputChange} disabled={searchFromDisabled}></Input>
      </Col>
      <Col span={1} style={{marginLeft:20}}>
        <Button type="primary" disabled={searchFromDisabled} onClick={onFind}><Icon type="search" /></Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    userTableStore : state.userTableReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleItem : (val) => {
      dispatch(selectMenuitem(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormtable);
