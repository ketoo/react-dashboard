import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, BackTop, Form, Icon } from 'antd';
import NFMonitor from './NFMonitor';
import NFLayout from './NFLayout';
import NFLogin from './NFLogin';
import NFAnalysisOperatePlatform from './NFAnalysisOperatePlatform';
import NFDailyNewUser from './NFDailyNewUser';
import NFDailyNewSourceUser from './NFDailyNewSourceUser';
import NFDailyActiveUser from './NFDailyActiveUser';
import NFDailyRetention from './NFDailyRetention';
import NFLevelPreview from './NFLevelPreview';
import NFItemFlow from './NFItemFlow';
import NFTaskFlow from './NFTaskFlow';
import NFActivityFlow from './NFActivityFlow';
import NFRoundFlow from './NFRoundFlow';
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
        
        { contentType <=0 && 
          <NFAnalysisOperatePlatform  store={this.props.store}/>
        }
        { contentType == 1 && 
          <NFDailyNewUser  store={this.props.store}/>
        }
        { contentType == 2 && 
          <NFDailyNewSourceUser  store={this.props.store}/>
        }
        { contentType == 3 && 
          <NFDailyActiveUser  store={this.props.store}/>
        }
        { contentType == 4 && 
          <NFDailyRetention  store={this.props.store}/>
        } 
        { contentType == 5 && 
          <NFLevelPreview  store={this.props.store}/>
        }
        { contentType == 11 && 
          <NFItemFlow  store={this.props.store}/>
        }
        { contentType == 21 && 
          <NFTaskFlow  store={this.props.store}/>
        }
        { contentType == 23 && 
          <NFRoundFlow  store={this.props.store}/>
        }
        { contentType == 25 && 
          <NFActivityFlow  store={this.props.store}/>
        }
      </Content>
    );
  }
}

export default NFContent;