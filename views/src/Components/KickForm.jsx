import React, { Component } from 'react';

import axios from 'axios';

import { Form, Input, Button, Select } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;


export default class KickForm extends Component {

  state = {
    textareaVal : '',
    selectVal : 'Choose the chat',
    res : ''
  }

  onUsersChange = async (e) => {
    await this.setState({
      textareaVal :  e.target.value
    });
  };
  onChatChange = async (value) => {
    await this.setState({
      selectVal : value
    });
  }

  submitForm = async (e) => {
    e.preventDefault();
    try{
      let res = await axios({
        method: 'POST',
        url: '/test',
        data: {
          'textarea': this.state.textareaVal
        }
      });
      await this.setState({
        res : 'Form was successfully sent!'
      });
    }
    catch(err){
      await this.setState({
        res : 'An error occurred!'
      });
      console.log(err);
    }
    finally{
      await this.setState({
        textareaVal : '',
        selectVal : ''
      });
    }
  }


  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <h1>Kick users</h1>
        <TextArea
          style={{marginBottom : 20, overflowX : 'hidden'}}
          placeholder="Autosize height with minimum and maximum number of lines"
          autosize={{ minRows: 4, maxRows: 10 }}
          value={this.state.textareaVal}
          onChange={this.onUsersChange}>
        </TextArea>
        <Select
          style={{marginBottom : 20}}
          value={this.state.selectVal}
          onChange={this.onChatChange}>
          <Option value="option1">Chat 1</Option>
          <Option value="option2">Chat 2</Option>
          <Option value="option3">Chat 3</Option>
          <Option value="option4">Chat 4</Option>
        </Select>
        <br/>
        <Button size="large" htmlType="submit" type="primary">button</Button>
      </Form>
    );
  }

}
