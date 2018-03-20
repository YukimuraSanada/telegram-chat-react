import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'antd';

import SideBar from './Components/Sidebar/SiderBar.jsx';
import MainSection from './Components/MainSection.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <Layout  style={{ minHeight: '100vh' }}>
          <SideBar/>
          <MainSection></MainSection>
        </Layout>
      </Provider>
    );
  }
}

ReactDOM.render(<App />,document.querySelector('#app'));
