import React, { Component } from 'react';

import Textarea from 'muicss/lib/react/textarea';
import Form from 'muicss/lib/react/form';
import Button from 'muicss/lib/react/button';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Panel from 'muicss/lib/react/panel';
import axios from 'axios';

class KickForm extends Component {

  state = {
    textareaVal : '',
    selectVal : '',
    res : ''
  }

  onUsersChange = async (e) => {
    await this.setState({
      textareaVal : e.target.value
    });
  };
  onChatChange = async (e) => {
    await this.setState({
      selectVal : e.target.value
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
        <Textarea label="Users" type="text" rows='6' floatingLabel={true} value={this.state.textareaVal} onChange={this.onUsersChange} />
        <Select name="input" label="Select Chat" value={this.state.selectVal} onChange={this.onChatChange}>
          <Option value="option1" label="Chat 1" />
          <Option value="option2" label="Chat 2" />
          <Option value="option3" label="Chat 3" />
          <Option value="option4" label="Chat 4" />
        </Select>
        <Button color="primary">button</Button>
        { this.state.res &&  <Panel>{ this.state.res }</Panel> }
      </Form>
    );
  }

}

export default KickForm;
