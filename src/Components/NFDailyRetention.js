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

import {queryRetention, queryCurrentRetention} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyRetention extends React.Component {
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
            message.error('Please input plat and date');
            return;
        }

        queryRetention(this.state.curDate, this.state.curPlat);
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

    if (this.props.store.dailyRetentionData)
    {
        totalData = this.props.store.dailyRetentionData.totalUserData;
        platNewUser = this.props.store.dailyRetentionData.platUserData;
    }

    console.log("totalData", totalData);
    console.log("platNewUser", platNewUser);

    /*
        private String plat;
    
        private String time;
    
        //渠道人数，若渠道为0，则和total一样
        private Integer todayNumber;
    
        //今天总人数
        private Integer totalNumber;

            // 数据源
        const data = [
            { time: '1', todayNumber: 275, income: 2300 },
            { time: '2', todayNumber: 115, income: 667 },
            { time: '3', todayNumber: 120, income: 982 },
            { time: '4', todayNumber: 350, income: 5271 },
            { time: '5', todayNumber: 350, income: 5271 },
            { time: '6', todayNumber: 350, income: 5271 },
            { time: '7', todayNumber: 350, income: 5271 },
            { time: '8', todayNumber: 350, income: 5271 },
            { time: '9', todayNumber: 350, income: 5271 },
            { time: '10', todayNumber: 350, income: 5271 },
            { time: '11', todayNumber: 350, income: 5271 },
            { time: '12', todayNumber: 350, income: 5271 },
            { time: '13', todayNumber: 1350, income: 5271 },
            { time: '14', todayNumber: 150, income: 3710 }
        ];
       var platNewUser = [ 
            { time: '1', age: 21, gender: 'male' },
            { time: '2', age: 21, gender: 'male' },
            { time: '3', age: 21, gender: 'male' }
        ];
     
*/
        // 定义度量
        const cols = {
            rate: { alias: '留存率 Ratio' },
            day: { alias: 'New User Today' }
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
                <Breadcrumb.Item>留存总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                       渠道 {this.state.curPlat} <Icon type="down" />
                    </Button>
                </Dropdown>
                
                <DatePicker  onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>

            </Breadcrumb>

            { totalData && 
                <Chart width={900} height={400} data={totalData} scale={cols}>
                    <Axis name="day"   label={{formatter: val => `${val} 日留存`}}/>
                    <Axis name="rate" label={{formatter: val => `${val}`}}/>
                    <Tooltip/>
                    <Geom type="interval" position="day*rate" color="rate" />
                </Chart>
            }
            
            { platNewUser &&
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>

                            <Chart height={320} width={900} data={platNewUser} scale={cols}>
                            <Legend />
                            <Axis name="day"  label={{formatter: val => `${val} 日留存`}}/>
                            <Axis name="rate" label={{formatter: val => `${val}`}}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="line" position="day*rate" size={2} color={'city'} />
                            <Geom type='point' position="day*rate" size={6} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                            </Chart>
                        </div>
                        }
                    </div> 
            }
                
          </Content>
    );
  }
}

export default NFDailyRetention;