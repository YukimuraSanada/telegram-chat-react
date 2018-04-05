import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'antd';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter } from 'react-router-dom';

import SideBar from 'Components/Sidebar/SiderBar';
import 'src/globalStyles';
import rootReducer from 'src/rootReducer';
import ContentSectionLoadable from './LoadableHOCs/ContentSectionLoadable';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout  style={{ minHeight: '100vh' }}>
            <SideBar/>
            <ContentSectionLoadable />
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
