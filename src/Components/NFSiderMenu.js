import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import {queryDailyNewUser, queryDailyAvtivelyUser, queryRetention} from '../Services/NFBusinessAPI';

import {queryLevel} from '../Services/NFBusinessAPI';

import NFRootModel from '../Models/NFRootModel';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class NFSiderMenu extends React.Component {

    state = {
        collapsed: false,
      };
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }

      handleClick = (e) => {
        //console.log('click ', e.key);
        
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var dateStr = myDate.getFullYear() + "-" + month + "-" + myDate.getDate();
    

        window.store.setContentType(e.key);

        if (e.key == 1)
        {
          queryDailyNewUser(dateStr, "0", null);
        }
        if (e.key == 2)
        {
          queryDailyAvtivelyUser(dateStr, "0");
        }
        if (e.key == 3)
        {
          queryRetention(dateStr, "0", null);
        }
        if (e.key == 4)
        {
          queryLevel(dateStr, "0");
        }

        if (e.key == 11)
        {
        }
      }

  render() {
    return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu 
          onClick={this.handleClick} 
          theme="dark" 
          defaultSelectedKeys={['0']} 
          mode="inline"
          >

            <Menu.Item key="0">
              <Icon type="desktop" />
              <span>实时总览 Data Overview</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>总览 Overview</span></span>}
            >
              <Menu.Item key="1">新增 DNW </Menu.Item>
              <Menu.Item key="2">日活 DAU </Menu.Item>
              <Menu.Item key="3">日留存 DR </Menu.Item>
              <Menu.Item key="4">等级分布 LD </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>经济 Economic</span></span>}
            >
              <Menu.Item key="11">道具 Items</Menu.Item>
              <Menu.Item key="12">支付 Payment</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="team" /><span>产品 Production</span></span>}
            >
              <Menu.Item key="21">任务 Tasks</Menu.Item>
              <Menu.Item key="23">副本 Rounds</Menu.Item>
              <Menu.Item key="24">函数 API</Menu.Item>
              <Menu.Item key="25">活动 Activity</Menu.Item>
              {/*
              <Menu.Item key="22">流失 Blocking</Menu.Item>
              <Menu.Item key="26">行为 Behaviour</Menu.Item>
              */
            }
            </SubMenu>
          </Menu>
        </Sider>
    );
  }
}

export default NFSiderMenu;