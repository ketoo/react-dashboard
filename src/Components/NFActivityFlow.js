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

import {queryActivityData} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFActivityFlow extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: null }
        this.state = { curPlat: null }
        this.state = { curDate: null }
   
        this.state = { activityType: null }
      }

    handleMenuClick(e) {   
        this.setState({curZone: e.key})
    }

    handleTypeClick(e) {   
        this.setState({activityType: e.key})
    }
 
    queryClickAdd() {

        if (this.state.curDate == null)
        {
            this.state.curDate = moment();
        }
        if (this.state.activityType == null)
        {
            message.error('Please input activityType or taskID');
            return;
        }
        if (this.state.curZone == null)
        {
            message.error('Please input Zone');
            return;
        }
        queryActivityData(this.state.curDate, this.state.curZone, this.state.activityType);
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
    var totalActvityData;

    if (this.props.store.activityData)
    {
        totalActvityData = this.props.store.activityData;
    }

    console.log("totalActvityData", totalActvityData);

        // 定义度量
        const cols = {
            number: { alias: '今日增加or完成' },
            time: { alias: 'New User Today' }
        };

        const menuTypeList = (
            <Menu onClick={this.handleTypeClick.bind(this)}>
            {this.props.store.activityTypeList &&
                this.props.store.activityTypeList.map((key) => (  
                    <Menu.Item key={key}>Type {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

          const menuZoneList = (
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
                <Breadcrumb.Item>活动总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menuZoneList}>
                    <Button style={{ marginLeft: 8 }}>
                       区服 {this.state.curZone} <Icon type="down" />
                    </Button>
                </Dropdown>
                <Dropdown overlay={menuTypeList}>
                    <Button style={{ marginLeft: 8 }}>
                        活动TYPE {this.state.activityType} <Icon type="down" />
                    </Button>
                </Dropdown>

                
                <DatePicker defaultValue={moment()}  onChange={this.onChange.bind(this)}/>

   
            </Breadcrumb>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Button  type="primary" onClick={this.queryClickAdd.bind(this)}>查询参与流水</Button>
            </Breadcrumb>

            {console.log("totalActvityData", totalActvityData)}
            
            { totalActvityData && 
                <Chart height={400} data={totalActvityData} scale={cols} forceFit>
                    <Axis name="time" />
                    <Axis name="number" />
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="line" position="time*number" size={2} />
                    <Geom type='point' position="time*number" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>
            }
                
          </Content>
    );
  }
}

export default NFActivityFlow;