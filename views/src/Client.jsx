import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import KickForm from './components/KickForm.jsx';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

import 'muicss/lib/sass/mui.scss';
import './Client.css';

class App extends Component {
  render(){
    return (
      <Container fluid={true}>

        <Row>
          <Col md="8" md-offset="2">
            <Tabs>
              <Tab value="Kick form" label="Kick form">
                <div style={{ paddingTop : 20}}>
                  <KickForm />
                </div>
              </Tab>
              <Tab value="Show users" label="Show users">
                <div style={{ paddingTop : 20}}>
                  <strong>TODO THIS</strong>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<App />,document.querySelector('#app'));
