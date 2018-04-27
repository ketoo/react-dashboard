import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { Button, Dropdown, Icon, message } from 'antd';
import { View , DataSet} from '@antv/data-set';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import moment from 'moment';
import { DatePicker } from 'antd';

import {queryDailySourceNewUser} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFDailyNewSourceUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curSource: null }
        this.state = { curDate: null }
      }

    handleMenuClick(e) {   
        this.setState({curSource: e.key})
    }

    queryClick() {
        if (this.state.curSource == null)
        {
            message.error('Please input curSource');
            return;
        }

        if (this.state.curDate == null)
        {
            this.state.curDate = moment();
        }
        
        queryDailySourceNewUser(this.state.curDate, this.state.curSource);
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
        var sourceNewUser;

        if (this.props.store.newUserSourceData)
        {
            sourceNewUser = this.props.store.newUserSourceData.sourceUserData;

        }
        // 定义度量
        const cols = {
            todayNumber: { alias: '新用户 New users' },
            time: { alias: 'New User Today' }
        };

        const scale = {
            value: {
              alias: 'The Share Price in Dollars',
              formatter: function (val) {
                return val;
              }
            },
            year: {
              range: [0, 1]
            }
          }

        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
            {this.props.store.source &&
                this.props.store.source.map((key) => (  
                    <Menu.Item key={key}>渠道 {key}</Menu.Item>
                )) 
            }
            </Menu>
          );
          
            var dv;
            if (sourceNewUser)
            {
                var dtsource = JSON.stringify(sourceNewUser);
                console.log("dtsource",dtsource);
                
                var ds = new DataSet();
                dv = ds.createView();
                console.log("ds",ds);
                console.log("dv",dv);
                dv.source(dtsource); 
                //dv = new DataSet.View().source(dtsource); 
                dv.transform({
                type: 'fold',
                fields: [ 'todayNumber', 'todayNumberIos', 'todayNumberAnd' ], // 展开字段集
                key: 'type', // key字段
                value: 'value', // value字段
                });
            }
            

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>新增用户总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                       渠道 {this.state.curSource} <Icon type="down" />
                    </Button>
                </Dropdown>

                <DatePicker  defaultValue={moment()} onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>
   
            </Breadcrumb>

            { dv && 
                <Chart height={400} data={dv} scale={scale} forceFit>
                <Legend />
                <Axis name="time" />
                <Axis name="number" label={{formatter: val => `${val}`}}/>
                <Tooltip crosshairs={{type : "y"}}/>
                <Geom type="line" position="time*number" size={2} color={'city'} />
                <Geom type='point' position="time*todayNumber" size={4} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
              </Chart>
            }

            {/* hashmap<string, list<object>>
            { sourceNewUser &&
                Object.keys(sourceNewUser).map((key) => (  
                    <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                        { 
                        <div>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>{"渠道 plat: " + key}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Chart height={320} width={900} data={sourceNewUser[key]} scale={cols}>
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

export default NFDailyNewSourceUser;