import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, BackTop, Form, Icon } from 'antd';
import NFMonitor from './NFMonitor';
import NFAnalysisReport from './NFAnalysisReport';
import NFLayout from './NFLayout';
import NFLogin from './NFLogin';

const { Header, Footer, Sider, Content } = Layout;

class NFContent extends React.Component {

  render() {

    function Greeting(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <NFAnalysisReport/>;
      }
    
      return <NFMonitor/>;
    }

    return (
      <Content>
        <Greeting isLoggedIn={false} />,
      </Content>
    );
  }
}

export default NFContent;