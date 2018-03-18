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

import {queryTaskData} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFTaskFlow extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: '0' }
        this.state = { curPlat: '0' }
        this.state = { curDate: null }
   
        this.state = { taskType: null }
        this.state = { taskID: null }
      }

    handleTypeClick(e) {   
        this.setState({taskID: null})
        this.setState({taskType: e.key})
    }
    handleIDClick(e) {   
        this.setState({taskID: e.key})
        this.setState({taskType: null})

        console.log("taskID", this.state.taskID);
        console.log("taskType", this.state.taskType);
    }
 
    queryClickAdd() {
        if (this.state.curDate == null)
        {
            message.error('Please input  date');
            return;
        }

        if (this.state.taskType == null && this.state.taskID == null)
        {
            message.error('Please input taskType or taskID');
            return;
        }

        queryTaskData(this.state.curDate, this.state.taskType, this.state.taskID, 0);
    }

    queryClickReduce() {
        if (this.state.curDate == null)
        {
            message.error('Please input date');
            return;
        }

        if (this.state.taskType == null && this.state.taskID == null)
        {
            message.error('Please input taskType or taskID');
            return;
        }

        queryTaskData(this.state.curDate, this.state.taskType, this.state.taskID, 1);
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
    var totalTaskData;

    if (this.props.store.taskData)
    {
        totalTaskData = this.props.store.taskData;
    }

    console.log("totalTaskData", totalTaskData);

        // 定义度量
        const cols = {
            number: { alias: '今日增加or完成' },
            time: { alias: 'New User Today' }
        };

        const menuTypeList = (
            <Menu onClick={this.handleTypeClick.bind(this)}>
            {this.props.store.taskTypeList &&
                this.props.store.taskTypeList.map((key) => (  
                    <Menu.Item key={key}>Type {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

          const menuIDList = (
            <Menu onClick={this.handleIDClick.bind(this)}>
            {this.props.store.taskIDList &&
                this.props.store.taskIDList.map((key) => (  
                    <Menu.Item key={key}>ID {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>任务总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menuTypeList}>
                    <Button style={{ marginLeft: 8 }}>
                        任务TYPE {this.state.taskType} <Icon type="down" />
                    </Button>
                </Dropdown>

                <Dropdown overlay={menuIDList}>
                    <Button style={{ marginLeft: 8 }}>
                        任务ID {this.state.taskID} <Icon type="down" />
                    </Button>
                </Dropdown>


                
                <DatePicker  onChange={this.onChange.bind(this)}/>

   
            </Breadcrumb>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Button  type="primary" onClick={this.queryClickAdd.bind(this)}>查询添加流水</Button>
                <Button  type="primary" onClick={this.queryClickReduce.bind(this)}>查询完成流水</Button>
            </Breadcrumb>

            {console.log("totalTaskData", totalTaskData)}
            
            { totalTaskData && 
                <Chart height={400} data={totalTaskData} scale={cols} forceFit>
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

export default NFTaskFlow;