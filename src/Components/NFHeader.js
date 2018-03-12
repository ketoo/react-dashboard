import React, { Component } from 'react';
import { Layout} from 'antd';
import logo from '../logo.svg';
import '../App.css';

import NFHeaderMenu from './NFHeaderMenu'


const { Header } = Layout;

class NFHeader extends React.Component {
  render() {
    return (
        <Header style={{ background: '#fff', padding: 0, minHeight: '10vh' }} >
        <NFHeaderMenu store={this.props.store}/>
        {
           
        }
        </Header>
       
    );
  }
}

export default NFHeader;