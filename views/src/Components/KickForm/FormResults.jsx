import React from 'react';

import { Card, Col, Row, Button } from 'antd';
import { connect } from 'react-redux';

import { unban } from './KickFormActions';


const FormResults = ({ data : { kickedUsersArr, dontKickedUsersArr, missingDbUsers }, chatId, onButtonClick }) => {

  const dataToList = (arr) => {
    if (arr){
      return arr.map( (item,i) => {
        return <li key={i}>{item}</li>;
      });
    }
  };

  const handleButtonClick = () => {
    const data = {
      'textarea' : kickedUsersArr,
      'chatId' : chatId,
    };
    onButtonClick(data);
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title={`Kicked Users ${kickedUsersArr.length}`}>
          {dataToList(kickedUsersArr)}
          <Button
            onClick={handleButtonClick}
            type='danger'
            style={{ margin : '15px auto 0', display : 'block'}}>
            Unban Users
          </Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card title={`Dont kicked users ${dontKickedUsersArr.length}`}>
          {dataToList(dontKickedUsersArr)}
        </Card>
      </Col>
      <Col span={8}>
        <Card title={`Users which miss in database ${missingDbUsers.length}`}>
          {dataToList(missingDbUsers)}
        </Card>
      </Col>
    </Row>
  );
};



const mapDispatchToProps = dispatch => {
  return {
    onButtonClick : data => {
      dispatch(unban(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(FormResults);
