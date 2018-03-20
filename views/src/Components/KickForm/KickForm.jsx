import React, { Component } from 'react';

import axios from 'axios';

import { Form, Input, Button, Select } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

import { connect } from 'react-redux';
import { userFieldChange, chatFieldChange, submitForm } from './KickFormActions';

const KickForm = ({ onUsersChange, onSelectChange, kickFormState, onSubmitForm }) => {

  const handleUsersChange = e => {
    onUsersChange(e.target.value);
  };

  const handleChatChange = value => {
    onSelectChange(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const data = {
      textareaVal : kickFormState.textarea,
      selectVal : kickFormState.chatId
    };
    onSubmitForm(data);
  };

  const { textareaVal, selectVal } = kickFormState;
  return (
    <Form onSubmit={handleSubmitForm}>
      <h1>Kick users</h1>
      <TextArea
        style={{marginBottom : 20, overflowX : 'hidden'}}
        placeholder="Autosize height with minimum and maximum number of lines"
        autosize={{ minRows: 4, maxRows: 10 }}
        value={textareaVal}
        onChange={handleUsersChange}>
      </TextArea>
      <Select
        style={{marginBottom : 20}}
        value={selectVal}
        onChange={handleChatChange}>
        <Option value="-1001141677753">TRENIROVKI</Option>
        <Option value="-1001122317035">DIETOLOG</Option>
        <Option value="-1001158977542">PSIHOLOG</Option>
        <Option value="-1001168764058">PRETENZII</Option>
      </Select>
      <br/>
      <Button size="large" htmlType="submit" type="primary">button</Button>
    </Form>
  );
};


const mapStateToProps = state => {
  return {
    kickFormState : state.kickFormState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUsersChange : val => {
      dispatch(userFieldChange(val));
    },
    onSelectChange : val => {
      dispatch(chatFieldChange(val));
    },
    onSubmitForm : data => {
      dispatch(submitForm(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KickForm);
