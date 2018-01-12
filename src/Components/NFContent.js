import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Redirect } from 'react-router'
import { Layout, Menu, Breadcrumb } from 'antd';
import { BackTop } from 'antd';
import NFMonitor from './NFMonitor';
import NFWorkPlace from './NFWorkPlace';
import NFAnalysisReport from './NFAnalysisReport';
import NFLayout from './NFLayout';

const { Header, Footer, Sider, Content } = Layout;
const { Router } = Redirect;

{/*
  { path: 'workplace',
        component: NFWorkPlace,
        {
        childRoutes: [
          { path: '/messages/:id', component: NFMonitor },
          { path: 'messages/:id',
            onEnter: function (nextState, replaceState) {
              replaceState(null, '/messages/' + nextState.params.id)
            }
          }
        ]
      }
*/}
const routeConfig = [
  { 
    path: '/', component: NFAnalysisReport,
    indexRoute: { component: NFAnalysisReport },
    childRoutes: [
      { path: 'monitor', component: NFMonitor },
      { path: 'analysis', component: NFAnalysisReport },
      { path: 'workplace', component: NFWorkPlace },
    ]
  }
]

class NFContent extends React.Component {
  render() {
    return (
      <Content>
        <NFAnalysisReport>NFAnalysisReport</NFAnalysisReport>
        <NFWorkPlace>NFWorkPlace</NFWorkPlace>
      </Content>
    );
  }
}

export default NFContent;