import React from 'react';

import { Form, Input, Button, Select, Card, Spin, Alert  } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

import { connect } from 'react-redux';
import { userFieldChange, chatFieldChange, submitForm } from './KickFormActions';

import FormResults from './FormResults.jsx';

const KickForm = ({ onUsersChange, onSelectChange, kickFormState : { textareaVal, selectVal, resData, isLoading, error } , onSubmitForm }) => {

  const handleSubmitForm = e => {
    e.preventDefault();
    const data = {
      'textarea' : textareaVal,
      'chatId' : selectVal,
    };
    onSubmitForm(data);
  };

  const isResNotEmpty = !!Object.keys(resData).length;

  return (
    <div>
      <Spin spinning={isLoading}>
        <Card style={{ marginBottom : 15 }}>
          <Form onSubmit={handleSubmitForm}>
            <h1>Kick users</h1>
            <TextArea
              style={{marginBottom : 20, overflowX : 'hidden'}}
              placeholder="Autosize height with minimum and maximum number of lines"
              autosize={{ minRows: 4, maxRows: 10 }}
              value={textareaVal}
              onChange={onUsersChange}>
            </TextArea>
            <Select
              style={{marginBottom : 20}}
              value={selectVal}
              onChange={onSelectChange}>
              <Option value="-1001235195076">TEST</Option>
              <Option value="-1001141677753">TRENIROVKI</Option>
              <Option value="-1001122317035">DIETOLOG</Option>
              <Option value="-1001158977542">PSIHOLOG</Option>
              <Option value="-1001168764058">PRETENZII</Option>
            </Select>
            <br/>
            <Button size="large" htmlType="submit" type="primary">KICK USERS</Button>
          </Form>
        </Card>
        { isResNotEmpty && <FormResults data={resData}/> }
        { error &&
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
          />
        }
      </Spin>
    </div>
  );
};

const mapStateToProps = state => ({ kickFormState : state.kickFormState });

const mapDispatchToProps = dispatch => {
  return {
    onUsersChange : e => {
      dispatch(userFieldChange(e.target.value));
    },
    onSelectChange : value => {
      dispatch(chatFieldChange(value));
    },
    onSubmitForm : data => {
      dispatch(submitForm(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KickForm);
