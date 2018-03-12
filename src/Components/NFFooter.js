import React, { Component } from 'react';
import { Layout} from 'antd';

const { Footer } = Layout;

class NFFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
           Data analysis system
      </Footer>
    );
  }
}

export default NFFooter;