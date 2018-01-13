import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import NFLayout from './Components/NFLayout';
import NFFooter from './Components/NFFooter';

import { Layout, Menu, Breadcrumb, Icon, Form } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

  render() {


    return (
      <div className="App">
        <NFLayout store={this.props.store}/>
      </div>
    );
  }
}

export default App;