import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import moment from 'moment';
import { DatePicker } from 'antd';

import { Button, Dropdown, Icon, message } from 'antd';

import {queryDailyNewUser, queryCurrentDailyNewUser, queryDailyAvtivelyUser, queryCurrentDailyAvtivelyUser} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyActivelyUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: '0' }
        this.state = { curPlat: '0' }
        this.state = { curDate: null }
      }

    handleMenuClick(e) {
        this.setState({curZone: e.key})
    }
    
    queryClick() {

        if (this.state.curDate == null)
        {
            message.error('Please input zone and date');
            return;
        }

        queryDailyAvtivelyUser(this.state.curDate, this.state.curZone);
    }

    onChange(date, dateString) {
        if (dateString != null && dateString != "")
        {
            this.setState({curDate: dateString})
        }
    }

  render() {

       // 数据源
    var totalData ;
    var platNewUser;

    if (this.props.store.dailyActivelyUserData)
    {
        totalData = this.props.store.dailyActivelyUserData.totalUserData;
        platNewUser = this.props.store.dailyActivelyUserData.platUserData;

    }

    console.log("totalData", totalData);
    console.log("platNewUser", platNewUser);

        // 定义度量
        const cols = {
            todayNumber: { alias: '活跃用户 Actively user' },
            time: { alias: 'New User Today' }
        };

        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
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
                { totalData && 
                    <Breadcrumb.Item>日活跃总览 Overview</Breadcrumb.Item>
                }
                { platNewUser && 
                    <Breadcrumb.Item>当前区服 Overview</Breadcrumb.Item>
                }
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                       区服 {this.state.curZone} <Icon type="down" />
                    </Button>
                </Dropdown>

                <DatePicker onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>
   

            </Breadcrumb>

            { totalData && 
                <Chart height={400} data={totalData} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="todayNumber" label={{formatter: val => `${val}`}}/>
                    <Tooltip/>
                    <Geom type="interval" position="time*todayNumber" color="todayNumber" />
                </Chart>
            }
            
            { platNewUser &&
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>

                            <Chart height={400} data={platNewUser} scale={cols} forceFit>
                            <Legend />
                            <Axis name="time" />
                            <Axis name="todayNumber" label={{formatter: val => `${val}`}}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="line" position="time*todayNumber" size={2} color={'city'} />
                            <Geom type='point' position="time*todayNumber" size={6} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                            </Chart>
                        </div>
                        }
                    </div> 
            }
                
          </Content>
    );
  }
}

export default NFDailyActivelyUser;