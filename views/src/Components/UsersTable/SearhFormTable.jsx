import React from 'react';

import {  Button, Input, Row, Col, Icon, Select} from 'antd';
const Option = Select.Option;

import { connect } from 'react-redux';
import { loadingData, changeFindSelect, changeFindInput, findItems, filterData } from './UserTableActions';

const SearchFormtable = (props) => {

  const { onReload, loading, findBy, onFindChange, inputValue, onInputChange, searchFromDisabled } = props;

  const handleFindChange = (value) => {
    props.changeFindSelect(value);
  };

  const handleInputChange = (e) => {
    props.changeFindInput(e.target.value);
  };

  const onFindy = () => {

    const { findBy, inputValue } = props.userTableStore;
    const reg = new RegExp( inputValue, 'gi');
    let newData = props.data.map( item => {
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

    props.filterData(newData);
  };

  return (
    <Row>
      <Col span={12}>
        <Button
          type="primary"
          onClick={props.getData}
          loading={props.userTableStore.loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {props.isSelected ? `Selected ${props.selectedRowKeys.length} items` : ''}
        </span>
      </Col>
      <Col span={3}>
        <Select
          style={{ width: '80%' }}
          value={props.userTableStore.findBy}
          onChange={handleFindChange}>
          <Option value="username">Username</Option>
          <Option value="fullname">Full Name</Option>
        </Select>
      </Col>
      <Col span={7}>
        <Input value={props.userTableStore.inputValue} onChange={handleInputChange} disabled={props.userTableStore.isSearchFromDisabled}></Input>
      </Col>
      <Col span={1} style={{marginLeft:20}}>
        <Button type="primary" disabled={props.userTableStore.isSearchFromDisabled} onClick={onFindy}><Icon type="search" /></Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRowKeys : state.userTableReducer.selectedRowKeys,
    data : state.userTableReducer.data,
    userTableStore : state.userTableReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData : () => {
      dispatch(loadingData());
    },
    changeFindSelect : data => {
      dispatch(changeFindSelect(data));
    },
    changeFindInput : data => {
      dispatch(changeFindInput(data));
    },
    filterData : (data) => {
      dispatch(filterData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormtable);
