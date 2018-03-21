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

import {queryRoundData} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFRoundFlow extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: '0' }
        this.state = { curPlat: '0' }
        this.state = { curDate: null }
   
        this.state = { roundType: null }
        this.state = { roundID: null }
      }
      
    handleMenuClick(e) {   
        this.setState({curZone: e.key})
    }
    handleTypeClick(e) {   
        this.setState({roundType: e.key})
        this.setState({roundID: null})
    }
    handleIDClick(e) {   
        this.setState({roundType: null})
        this.setState({roundID: e.key})
    }
    queryClickAdd() {
        if (this.state.curDate == null)
        {
            message.error('Please input  date');
            return;
        }

        if (this.state.roundType == null && this.state.roundID == null )
        {
            message.error('Please input roundType or roundID');
            return;
        }

        queryRoundData(this.state.curDate, this.state.roundType, this.state.roundID);
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
    var totalRoundData;

    if (this.props.store.roundData)
    {
        totalRoundData = this.props.store.roundData;
    }

    console.log("totalRoundData11", totalRoundData);

        // 定义度量
        const cols = {
            number: { alias: '今日副本' },
            time: { alias: 'New User Today' }
        };

        const menuTypeList = (
            <Menu onClick={this.handleTypeClick.bind(this)}>
            {this.props.store.roundTypeList &&
                this.props.store.roundTypeList.map((key) => (  
                    <Menu.Item key={key}>Type {key}</Menu.Item>
                )) 
            }
            </Menu>
          );
          const menuIDList = (
            <Menu onClick={this.handleIDClick.bind(this)}>
            {this.props.store.roundIDList &&
                this.props.store.roundIDList.map((key) => (  
                    <Menu.Item key={key}>ID {key}</Menu.Item>
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
                        副本Type {this.state.roundType} <Icon type="down" />
                    </Button>
                </Dropdown>

                <Dropdown overlay={menuIDList}>
                    <Button style={{ marginLeft: 8 }}>
                        副本ID {this.state.roundID} <Icon type="down" />
                    </Button>
                </Dropdown>

                
                <DatePicker  onChange={this.onChange.bind(this)}/>

   
            </Breadcrumb>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Button  type="primary" onClick={this.queryClickAdd.bind(this)}>查询参与流水</Button>
            </Breadcrumb>

            {console.log("totalRoundData22", totalRoundData)}
            
            { totalRoundData && 
                <Chart height={400} data={totalRoundData} scale={cols} forceFit>
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

export default NFRoundFlow;