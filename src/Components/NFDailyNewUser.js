import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { DatePicker } from 'antd';
import NFRootModel from '../Models/NFRootModel';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import {queryDailyNewUser, queryCurrentDailyNewUser} from '../Services/NFBusinessAPI';
import moment from 'moment';

const { Content } = Layout;

@observer
class NFDailyNewUser extends React.Component {
    

  render() {

    function onChange(date, dateString) {
        console.log(date, dateString);
        if (dateString != null)
        {
            queryDailyNewUser(dateString);
        }
      }


       // 数据源
    var totalData ;
    var platNewUser;

    if (this.props.store.newUserData)
    {
        totalData = this.props.store.newUserData.totalUserData;
        platNewUser = this.props.store.newUserData.platUserData;

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
            todayNumber: { alias: 'New users' },
            time: { alias: 'New User Today' }
        };

 

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Overview</Breadcrumb.Item>
                <DatePicker className="login-form-forgot" default={moment()} value={moment()} onChange={onChange}/>
            </Breadcrumb>

            { totalData && 
                <Chart width={900} height={400} data={totalData} scale={cols}>
                    <Axis name="time" />
                    <Axis name="todayNumber"/>
                    <Tooltip/>
                    <Geom type="interval" position="time*todayNumber" color="todayNumber" />
                </Chart>
            }
            
            { platNewUser &&
                Object.keys(platNewUser).map((key) => (  
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>{"plat:" + key}</Breadcrumb.Item>
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
                
          </Content>
    );
  }
}

export default NFDailyNewUser;