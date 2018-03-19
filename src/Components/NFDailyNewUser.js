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

import {queryDailyNewUser, queryCurrentDailyNewUser} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyNewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: '0' }
        this.state = { curPlat: '0' }
        this.state = { curDate: null }
      }

    handleMenuClick(e) {   
        this.setState({curPlat: e.key})
    }
    
    queryClick() {
        if (this.state.curDate == null || this.state.curPlat == null)
        {
            message.error('Please input curPlat and date');
            return;
        }

        queryDailyNewUser(this.state.curDate, this.state.curPlat);
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
    var totalData ;
    var platNewUser;

    if (this.props.store.newUserData)
    {
        totalData = this.props.store.newUserData.totalUserData;
        platNewUser = this.props.store.newUserData.platUserData;

    }
        // 定义度量
        const cols = {
            todayNumber: { alias: '新用户 New users' },
            time: { alias: 'New User Today' }
        };
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
            {this.props.store.plat &&
                this.props.store.plat.map((key) => (  
                    <Menu.Item key={key}>渠道 {key}</Menu.Item>
                )) 
            }
            </Menu>
          );
 

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>新增用户总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                       渠道 {this.state.curPlat} <Icon type="down" />
                    </Button>
                </Dropdown>

                <DatePicker  onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>
   
            </Breadcrumb>

            { totalData && 
                <Chart height={400} data={totalData} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="todayNumber"/>
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

                        <Chart height={400} data={platNewUser} scale={cols} width={900} forceFit>
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

            {/* hashmap<string, list<object>>
            { platNewUser &&
                Object.keys(platNewUser).map((key) => (  
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>{"渠道 plat: " + key}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Chart height={320} width={900} data={platNewUser[key]} scale={cols}>
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
                  )) 
            }
            */}
                
          </Content>
    );
  }
}

export default NFDailyNewUser;