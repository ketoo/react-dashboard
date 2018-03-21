import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { Modal, Button } from 'antd';
import NFRootModel from '../Models/NFRootModel';

const { Header, Content, Footer, Sider, MenuItemGroup } = Layout;
const SubMenu = Menu.SubMenu;

@observer
class NFHeaderMenu extends React.Component {

    state = {
        current: 'dobz',
        visible: false,
      }

      showModal = () => {
        this.setState({
          visible: true,
        });
      }

      @action
      handleClick = (e) => {
        

        this.setState({
          current: e.key,
        });

        if (e.key == "setting_3")
        {
          window.store.clearAllData();
        }
        else if (e.key == "dobz")
        {

        }
      }
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
  render() {
    return (


        <Menu
          className="login-form-forgot"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
        <Menu.Item key="dobz">
          <Icon type="mail" />Email
        </Menu.Item>
        <Menu.Item key="add">
          <Icon type="user-add" />Add user
        </Menu.Item>
        <SubMenu title={<span><Icon type="user" />{this.props.store.userID}</span>}>
            <Menu.Item key="setting_1">Profiles</Menu.Item>
            <Menu.Item key="setting_2">Setting</Menu.Item>
            <Menu.Item key="setting_3">Log out</Menu.Item>
        </SubMenu>
      </Menu>

      
    );
  }
}

export default NFHeaderMenu;