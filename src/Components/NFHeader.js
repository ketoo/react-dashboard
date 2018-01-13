import React, { Component } from 'react';
import { Layout} from 'antd';
import logo from '../logo.svg';
import '../App.css';

import NFHeaderMenu from './NFHeaderMenu'


const { Header } = Layout;

class NFHeader extends React.Component {
  render() {
    return (
        <Header style={{ background: '#000', padding: 0, minHeight: '10vh' }} >
        <NFHeaderMenu store={this.props.store}/>
        {/*
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            </div>
        */}
        </Header>
       
    );
  }
}

export default NFHeader;