import React from 'react';

import {  Button, Input, Row, Col, Icon, Select} from 'antd';
const Option = Select.Option;

import { connect } from 'react-redux';
import { loadingData, changeFindSelect, changeFindInput, filterData } from './UserTableActions';

const SearchFormtable = ({isSelected, userTableStore, getData, changeFindInput, changeFindSelect, filterData}) => {

  const {
    data,
    findBy,
    inputValue,
    loading,
    isSearchFromDisabled,
    selectedRowKeys
  } = userTableStore;

  const handleFindChange = (value) => {
    changeFindSelect(value);
  };

  const handleInputChange = (e) => {
    changeFindInput(e.target.value);
  };

  const onFindy = () => {

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

    filterData(newData);
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
          onChange={handleFindChange}>
          <Option value="username">Username</Option>
          <Option value="fullname">Full Name</Option>
        </Select>
      </Col>
      <Col span={7}>
        <Input value={inputValue} onChange={handleInputChange} disabled={isSearchFromDisabled}></Input>
      </Col>
      <Col span={1} style={{marginLeft:20}}>
        <Button type="primary" disabled={isSearchFromDisabled} onClick={onFindy}><Icon type="search" /></Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    userTableStore : state.userTableState,
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
