import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'antd';

import SideBar from './Components/Sidebar/SiderBar.jsx';
import MainSection from './Components/MainSection.jsx';

class App extends Component {

  state = {
    collapsed: true,
    selectedItem : 2
  }

  handleToggle  = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleSelect = (key) => {
    this.setState({
      selectedItem : key
    });
  };

  render(){
    return (
      <Layout  style={{ minHeight: '100vh' }}>
        <SideBar isCollapsed={this.state.collapsed} onHandleSelect={this.handleSelect}/>
        <MainSection onHandleToggle={this.handleToggle} isCollapsed={this.state.collapsed} selectedItem={this.state.selectedItem}></MainSection>
      </Layout>
    );
  }
}

ReactDOM.render(<App />,document.querySelector('#app'));
