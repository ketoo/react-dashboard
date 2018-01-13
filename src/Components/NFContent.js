import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BackTop } from 'antd';
import NFMonitor from './NFMonitor';
import NFAnalysisReport from './NFAnalysisReport';
import NFLayout from './NFLayout';

const { Header, Footer, Sider, Content } = Layout;

class NFContent extends React.Component {
  render() {
    return (
      <Content>
        <NFAnalysisReport>NFAnalysisReport</NFAnalysisReport>
        <NFMonitor>NFMonitor</NFMonitor>
      </Content>
    );
  }
}

export default NFContent;