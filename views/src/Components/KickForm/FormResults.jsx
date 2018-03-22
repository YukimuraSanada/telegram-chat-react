import React from 'react';
import { Card, Col, Row } from 'antd';

const FormResults = ({ data : { kickedUsersArr, dontKickedUsersArr, missingDbUsers }}) => {

  const dataToList = (arr) => {
    if (arr){
      return arr.map( (item,i) => {
        return <li key={i}>{item}</li>;
      });
    }
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title={`Kicked Users ${kickedUsersArr.length}`}>{dataToList(kickedUsersArr)}</Card>
      </Col>
      <Col span={8}>
        <Card title={`Dont kicked users ${dontKickedUsersArr.length}`}>{dataToList(dontKickedUsersArr)}</Card>
      </Col>
      <Col span={8}>
        <Card title={`Users which miss in database ${missingDbUsers.length}`}>{dataToList(missingDbUsers)}</Card>
      </Col>
    </Row>
  );
};

export default FormResults;
