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

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

const { Header, Footer, Sider, Content } = Layout;

@observer
class NFContent extends React.Component {

  render() {

    function Greeting(props) {
      const contentType = props.contentType;
      if (contentType == 1) {
        return <NFDailyNewUser/>;
      }
      else if (contentType == 2)
      {
        return <NFDailyActiveUser/>;
      }
      else if (contentType == 3)
      {
        return <NFDailyRetentionRatio/>;
      }
      return <NFMonitor/>;
    }

    return (
      <Content>
        
        <Greeting contentType={3} />,
      </Content>
    );
  }
}

export default NFContent;