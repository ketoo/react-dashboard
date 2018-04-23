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

        this.state = { curZone: null }
        this.state = { curPlat: null }
        this.state = { curDate: null }
      }

    handleMenuClick(e) {   
        this.setState({curPlat: e.key})
        this.setState({curZone: null})
    }
    handleMenuZoneClick(e) {   
        this.setState({curPlat: null})
        this.setState({curZone: e.key})
    }
    queryClick() {
        if (this.state.curPlat == null && this.state.curZone == null)
        {
            message.error('Please input curPlat or date');
            return;
        }

        if (this.state.curDate == null)
        {
            this.state.curDate = moment();
        }
        

        queryRetention(this.state.curDate, this.state.curPlat, this.state.curZone);
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
                <Breadcrumb.Item>留存总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                       渠道 {this.state.curPlat} <Icon type="down" />
                    </Button>
                </Dropdown>
                <Dropdown overlay={menuZone}>
                    <Button style={{ marginLeft: 8 }}>
                       区服 {this.state.curZone} <Icon type="down" />
                    </Button>
                </Dropdown>

                <DatePicker defaultValue={moment()}  onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>

            </Breadcrumb>

            { totalData && 
                <Chart width={900} height={400} data={totalData} scale={cols}>
                    <Axis name="day"   label={{formatter: val => `${val} 日留存`}}/>
                    <Axis name="rate" label={{formatter: val => `${val}`}}/>
                    <Tooltip/>
                    <Geom type="interval" position="day*rate" color="genre" />
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
                            <Geom type='point' position="day*rate" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
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