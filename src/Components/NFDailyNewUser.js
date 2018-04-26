import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Button, Dropdown, Icon, message } from 'antd';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import moment from 'moment';
import { DatePicker } from 'antd';

import {queryDailyZoneNewUser} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyNewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: null }
        this.state = { curDate: null }
      }

    handleMenuZoneClick(e) {   
        this.setState({curZone: e.key})
    }

    queryClick() {
        if (this.state.curZone == null)
        {
            message.error('Please input curZone');
            return;
        }

        if (this.state.curDate == null)
        {
            this.state.curDate = moment();
        }
        
        queryDailyZoneNewUser(this.state.curDate, this.state.curZone);
    }

    onChange(date, dateString) {
        console.log(date, dateString);
        if (dateString != null && dateString != "")
        {
            this.setState({curDate: dateString})
        }
      }

  render() {

       // 数据源
    var zoneUserData;

    if (this.props.store.newUserZoneData)
    {
        zoneUserData = this.props.store.newUserZoneData.zoneUserData;

    }
        // 定义度量
        const cols = {
            todayNumber: { alias: '新用户 New users' },
            time: { alias: 'New User Today' }
        };
        
          const menuZone = (
            <Menu onClick={this.handleMenuZoneClick.bind(this)}>
            {this.props.store.zone &&
                this.props.store.zone.map((key) => (  
                    <Menu.Item key={key}>区服 {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>新增用户总览-区服 ZoneOverview</Breadcrumb.Item>

                <Dropdown overlay={menuZone}>
                    <Button style={{ marginLeft: 8 }}>
                       区服 {this.state.curZone} <Icon type="down" />
                    </Button>
                </Dropdown>

                <DatePicker  defaultValue={moment()} onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>
   
            </Breadcrumb>

            { zoneUserData && 
                <Chart height={400} data={zoneUserData} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="todayNumber"/>
                    <Tooltip/>
                    <Geom type="line" position="time*number" size={2} />
                    <Geom type='point' position="time*todayNumber" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>

                
            }
            { zoneUserData && 
                <Chart height={400} data={zoneUserData} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="totalNumber"/>
                    <Tooltip/>
                    <Geom type="line" position="time*number" size={2} />
                    <Geom type='point' position="time*totalNumber" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>

                
            }
                
          </Content>
    );
  }
}

export default NFDailyNewUser;