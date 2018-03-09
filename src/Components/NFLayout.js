import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, BackTop, Form, Icon } from 'antd';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import NFFooter from './NFFooter'
import NFHeader from './NFHeader'
import NFContent from './NFContent'
import NFSiderMenu from './NFSiderMenu'
import NFLoginForm from './NFLogin';
import NFRootModel from '../Models/NFRootModel';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

@observer
class NFLayout extends React.Component {


  render() {

  const NFLogin = Form.create()(NFLoginForm);
 
    return (
        <Layout style={{ minHeight: '100vh' }}>
            { this.props.store.isLoggedIn && 
              <NFSiderMenu store={this.props.store}/>
            }
        <Layout>
          <Content >
            { this.props.store.isLoggedIn && 
              <NFHeader store={this.props.store}/>
            }
            { this.props.store.isLoggedIn && 
              <NFContent store={this.props.store}/>
            }
            { !this.props.store.isLoggedIn && 
              <NFLogin/>
            }
            
          </Content>
          <NFFooter store={this.props.store}/>
        </Layout>
    </Layout>
    );
  }
}

export default NFLayout;