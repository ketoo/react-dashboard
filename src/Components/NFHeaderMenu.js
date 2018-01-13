import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import NFRootModel from '../Models/NFRootModel';

const { Header, Content, Footer, Sider, MenuItemGroup } = Layout;
const SubMenu = Menu.SubMenu;

@observer
class NFHeaderMenu extends React.Component {

    state = {
        current: 'mail',
      }

      @action
      handleClick = (e) => {

        window.store.setLoginState(false);

        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }

  render() {
    return (
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NFHeaderMenu;