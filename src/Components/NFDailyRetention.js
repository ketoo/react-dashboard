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

import {queryRetention, queryCurrentRetention} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyRetention extends React.Component {
    

  render() {

    function onChange(date, dateString) {
        console.log(date, dateString);
        if (dateString != null && dateString != "")
        {
            queryRetention(dateString);
        }
      }


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

 

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>留存总览 Overview</Breadcrumb.Item>
                <DatePicker className="login-form-forgot" default={moment()} value={moment()} onChange={onChange}/>
            </Breadcrumb>

            { totalData && 
                <Chart width={900} height={400} data={totalData} scale={cols}>
                    <Axis name="day" />
                    <Axis name="rate" label={{formatter: val => `${val}`}}/>
                    <Tooltip/>
                    <Geom type="interval" position="day*rate" color="rate" />
                </Chart>
            }
            
            { platNewUser &&
                Object.keys(platNewUser).map((key) => (  
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>{"渠道 plat:" + key}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Chart height={320} width={900} data={platNewUser[key]} scale={cols}>
                            <Legend />
                            <Axis name="day" />
                            <Axis name="rate" label={{formatter: val => `${val}`}}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="line" position="day*rate" size={2} color={'city'} />
                            <Geom type='point' position="day*rate" size={6} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                            </Chart>
                        </div>
                        }
                    </div> 
                  )) 
            }
                
          </Content>
    );
  }
}

export default NFDailyRetention;