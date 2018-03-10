import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, BackTop, Form, Icon } from 'antd';
import NFMonitor from './NFMonitor';
import NFLayout from './NFLayout';
import NFLogin from './NFLogin';
import NFAnalysisReport from './NFAnalysisReport';
import NFDailyNewUser from './NFDailyNewUser';
import NFDailyActiveUser from './NFDailyActiveUser';
import NFDailyRetentionRatio from './NFDailyRetentionRatio';
import NFLevelPreview from './NFLevelPreview';
import NFMenuModel from '../Models/NFMenuModel';
import NFRootModel from '../Models/NFRootModel';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

const { Header, Footer, Sider, Content } = Layout;

@observer
class NFContent extends React.Component {

  render() {

    const contentType = this.props.store.contentType;
    console.log("contentType", contentType);

    return (
      
      <Content>
        { contentType == 1 && 
          <NFDailyNewUser  store={this.props.store}/>
        }
        { contentType == 2 && 
          <NFDailyActiveUser  store={this.props.store}/>
        }
        { contentType == 3 && 
          <NFDailyRetentionRatio  store={this.props.store}/>
        } 
        
        { contentType == 4 && 
          <NFLevelPreview  store={this.props.store}/>
        }
      </Content>
    );
  }
}

export default NFContent;