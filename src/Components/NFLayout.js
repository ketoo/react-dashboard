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

    function IsShowSiderMenu(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <NFSiderMenu/>;
        }
       
        return null;
    }
    function IsShowHeader(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <NFHeader/>;
        }
       
        return null;
    }
    function IsShowContent(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <NFContent/>;
        }
       
        return null;
    }
    function IsShowLoginForm(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return null;
        }
       
        return <NFLogin/>;
    }
 
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <IsShowSiderMenu isLoggedIn={this.props.store.isLoggedIn}/>
        <Layout>
          <Content store={this.props.store} >
            <IsShowHeader isLoggedIn={this.props.store.isLoggedIn}/>
            <IsShowContent isLoggedIn={this.props.store.isLoggedIn} />
            <IsShowLoginForm isLoggedIn={this.props.store.isLoggedIn} />
          </Content>
          <NFFooter store={this.props.store}/>
        </Layout>
    </Layout>
    );
  }
}

export default NFLayout;