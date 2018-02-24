import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import KickForm from './components/KickForm.jsx';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import 'muicss/lib/sass/mui.scss';
import './Client.css';

class App extends Component {
  render(){
    return (
      <Container fluid={true}>
        <Row>
          <Col md="8" md-offset="2">
            <KickForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<App />,document.querySelector('#app'));
