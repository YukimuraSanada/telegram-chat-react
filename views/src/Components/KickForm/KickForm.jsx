//TODO split to more components
import React from 'react';

import { Form, Input, Button, Select, Card, Spin, Alert  } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
import { connect } from 'react-redux';
import { userFieldChange, chatFieldChange, submitForm } from './KickFormActions';

import FormResults from './FormResults';
import { cardStyle, areaStyle, selectStyle, alertStyle } from './KickFormStyles';


const KickForm = ({
  onUsersChange,
  onSelectChange,
  textareaVal,
  selectVal,
  resData,
  isLoading,
  error,
  onSubmitForm }) => {

  const handleSubmitForm = e => {
    e.preventDefault();
    const data = {
      'textarea' : textareaVal,
      'chatId' : selectVal,
    };
    onSubmitForm(data);
  };

  const isResNotEmpty = !!Object.keys(resData).length;

  const areaSize = { minRows: 4, maxRows: 10 };

  return (
    <div>
      <Spin spinning={isLoading}>
        <Card style={cardStyle}>
          <Form onSubmit={handleSubmitForm}>
            <h1>Kick users</h1>
            <TextArea
              style={areaStyle}
              placeholder="Autosize height with minimum and maximum number of lines"
              autosize={areaSize}
              value={textareaVal}
              onChange={onUsersChange}>
            </TextArea>
            <Select
              style={selectStyle}
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
        { isResNotEmpty && <FormResults data={resData} chatId={selectVal}/> }
        { error &&
          <Alert
            style={alertStyle}
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

const mapStateToProps = state => ({
  textareaVal : state.kickFormState.textareaVal,
  selectVal : state.kickFormState.selectVal,
  resData : state.kickFormState.resData,
  isLoading : state.kickFormState.isLoading,
  error : state.kickFormState.error,
});

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
