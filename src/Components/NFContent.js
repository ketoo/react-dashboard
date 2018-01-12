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
      <Router routes={routeConfig} />, document.body
    
    );
  }
}

export default NFContent;