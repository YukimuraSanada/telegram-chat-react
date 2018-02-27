import React from 'react';

import {  Button, Input, Row, Col, Icon, Select} from 'antd';
const Option = Select.Option;

const SearchFormtable = (props) => {

  const { onReload, loading, findBy, onFindChange, inputValue, onInputChange, onFind } = props;

  return (
    <Row>
      <Col span={12}>
        <Button
          type="primary"
          onClick={onReload}
          loading={loading}>
          Reload
        </Button>
      </Col>
      <Col span={3}>
        <Select
          style={{ width: 150 }}
          value={findBy}
          onChange={onFindChange}>
          <Option value="username">Username</Option>
          <Option value="fullname">Full Name</Option>
        </Select>
      </Col>
      <Col span={7}>
        <Input value={inputValue} onChange={onInputChange}></Input>
      </Col>
      <Col span={1} style={{marginLeft:20}}>
        <Button type="primary" onClick={onFind}><Icon type="search" /></Button>
      </Col>
    </Row>
  );
};

export default SearchFormtable;
