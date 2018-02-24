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
    textarea : '',
    res : ''
  }

  handleClick = async (e) => {
    await this.setState({
      textarea : e.target.value
    });
    console.log(this.state.textarea);
  };

  submitForm = async (e) => {
    e.preventDefault();
    try{
      let res = await axios({
        method: 'POST',
        url: '/test',
        data: {
          'textarea': this.state.textarea
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
      console.log(error);
    }
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <h1>Kick users</h1>
        <Textarea label="Users" type="text" rows='6' floatingLabel={true} value={this.state.textarea} onChange={this.handleClick} />
        <Select name="input" label="Select Chat" >
          <Option value="option1" label="Chat 1" />
          <Option value="option2" label="Chat 2" />
          <Option value="option3" label="Chat 3" />
          <Option value="option4" label="Chat 4" />
        </Select>
        <Button color="primary">button</Button>
        {
          this.state.res &&
          <Panel>
            { this.state.res }
          </Panel>
        }
      </Form>
    );
  }

}

export default KickForm;
