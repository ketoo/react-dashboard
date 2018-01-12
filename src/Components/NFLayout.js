import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import NFFooter from './NFFooter'
import NFHeader from './NFHeader'
import NFContent from './NFContent'
import NFSiderMenu from './NFSiderMenu'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class NFLayout extends React.Component {


    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
            <NFSiderMenu/>
        <Layout>
            
          <Content style={{ margin: '0 16px' }}>
            <NFHeader/>
            <NFContent/>
          </Content>
          <NFFooter/>
        </Layout>
      </Layout>
      );
    }
  }
  
  export default NFLayout;