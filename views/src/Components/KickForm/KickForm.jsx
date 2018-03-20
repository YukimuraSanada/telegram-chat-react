import React, { Component } from 'react';

import axios from 'axios';

import { Form, Input, Button, Select } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

import { connect } from 'react-redux';
import { userFieldChange, chatFieldChange } from './KickFormActions';

class KickForm extends Component {

  state = {
    textareaVal : '',
    selectVal : 'Choose the chat',
    res : ''
  }

  handleUsersChange = (e) => {
    this.props.onUsersChange(e.target.value);
  };

  handleChatChange = (value) => {
    this.props.onSelectChange(value);
  }

  submitForm = async (e) => {
    e.preventDefault();
    try{
      let res = await axios({
        method: 'POST',
        url: '/test',
        data: {
          'textarea': this.state.textareaVal,
          'chatId' : this.state.selectVal
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
          value={this.props.kickFormState.textareaVal}
          onChange={this.handleUsersChange}>
        </TextArea>
        <Select
          style={{marginBottom : 20}}
          value={this.props.kickFormState.selectVal}
          onChange={this.handleChatChange}>
          <Option value="-1001141677753">TRENIROVKI</Option>
          <Option value="-1001122317035">DIETOLOG</Option>
          <Option value="-1001158977542">PSIHOLOG</Option>
          <Option value="-1001168764058">PRETENZII</Option>
        </Select>
        <br/>
        <Button size="large" htmlType="submit" type="primary">button</Button>
      </Form>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    kickFormState : state.kickFormReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersChange : (val) => {
      dispatch(userFieldChange(val));
    },
    onSelectChange : (val) => {
      dispatch(chatFieldChange(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KickForm);
