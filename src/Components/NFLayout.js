import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, BackTop, Form, Icon } from 'antd';

import NFFooter from './NFFooter'
import NFHeader from './NFHeader'
import NFContent from './NFContent'
import NFSiderMenu from './NFSiderMenu'
import NFLogin from './NFLogin';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class NFLayout extends React.Component {

    render() {

      function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <NFContent/>;
        }
       
        return Form.create()(NFLogin);
      }

      return (
        <Layout style={{ minHeight: '100vh' }}>
            <NFSiderMenu />
        <Layout>
            
          <Content style={{ margin: '0 16px' }}>
            <NFHeader/>
            <Greeting isLoggedIn={true} />
          </Content>
          <NFFooter/>
        </Layout>
      </Layout>
      );
    }
  }
  
  export default NFLayout;