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

import {queryItemData} from '../Services/NFBusinessAPI';
import NFRootModel from '../Models/NFRootModel';

const { Content } = Layout;

@observer
class NFItemFlow extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: '0' }
        this.state = { curPlat: '0' }
        this.state = { curDate: null }
   
        this.state = { itemType: null }
        this.state = { itemID: null }
        this.state = { itemReason: null }
        this.state = { itemSubReason: null }
      }

    handleTypeClick(e) {   
        this.setState({itemID: null})
        this.setState({itemType: e.key})
    }
    handleIDClick(e) {   
        this.setState({itemID: e.key})
        this.setState({itemType: null})

        console.log("ItemID", this.state.itemID);
        console.log("itemType", this.state.itemType);
    }
    handleReasonClick(e) {   
        this.setState({itemReason: e.key})
        this.setState({itemSubReason: null})
    }
    handleSubReasonClick(e) {   
        this.setState({itemReason: null})
        this.setState({itemSubReason: e.key})
    }
    queryClickAdd() {
        if (this.state.curDate == null)
        {
            message.error('Please input  date');
            return;
        }

        if (this.state.itemType == null && this.state.itemID == null)
        {
            message.error('Please input itemType or itemID');
            return;
        }

        queryItemData(this.state.curDate, this.state.itemType, this.state.itemID, this.state.itemReason, this.state.itemSubReason, 1);
    }

    queryClickReduce() {
        if (this.state.curDate == null)
        {
            message.error('Please input date');
            return;
        }

        if (this.state.itemType == null && this.state.itemID == null)
        {
            message.error('Please input itemType or itemID');
            return;
        }

        queryItemData(this.state.curDate, this.state.itemType, this.state.itemID, this.state.itemReason, this.state.itemSubReason, 0);
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
    var totalItemData;

    if (this.props.store.itemData)
    {
        totalItemData = this.props.store.itemData;
    }

    console.log("totalItemData", totalItemData);

        // 定义度量
        const cols = {
            number: { alias: '今日使用量' },
            time: { alias: 'New User Today' }
        };

        const menuTypeList = (
            <Menu onClick={this.handleTypeClick.bind(this)}>
            {this.props.store.itemTypeList &&
                this.props.store.itemTypeList.map((key) => (  
                    <Menu.Item key={key}>Type {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

          const menuIDList = (
            <Menu onClick={this.handleIDClick.bind(this)}>
            {this.props.store.itemIDList &&
                this.props.store.itemIDList.map((key) => (  
                    <Menu.Item key={key}>ID {key}</Menu.Item>
                )) 
            }
            </Menu>
          );

          const menuReasonList = (
            <Menu onClick={this.handleReasonClick.bind(this)}>
            {this.props.store.reasonList &&
                this.props.store.reasonList.map((key) => (  
                    <Menu.Item key={key}>Reason {key}</Menu.Item>
                )) 
            }
            </Menu>
          );
          const menuSubReasonList = (
            <Menu onClick={this.handleSubReasonClick.bind(this)}>
            {this.props.store.subReasonList &&
                this.props.store.subReasonList.map((key) => (  
                    <Menu.Item key={key}>SubReason {key}</Menu.Item>
                )) 
            }
            </Menu>
          );
    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>道具总览 Overview</Breadcrumb.Item>

                <Dropdown overlay={menuTypeList}>
                    <Button style={{ marginLeft: 8 }}>
                        道具TYPE {this.state.itemType} <Icon type="down" />
                    </Button>
                </Dropdown>

                <Dropdown overlay={menuIDList}>
                    <Button style={{ marginLeft: 8 }}>
                        道具ID {this.state.itemID} <Icon type="down" />
                    </Button>
                </Dropdown>

                <Dropdown overlay={menuReasonList}>
                    <Button style={{ marginLeft: 8 }}>
                        道具Reason  {this.state.itemReason} <Icon type="down" />
                    </Button>
                </Dropdown>

                <Dropdown overlay={menuSubReasonList}>
                    <Button style={{ marginLeft: 8 }}>
                        道具SubReason {this.state.itemSubReason} <Icon type="down" />
                    </Button>
                </Dropdown>

                
                <DatePicker  onChange={this.onChange.bind(this)}/>

   
            </Breadcrumb>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Button  type="primary" onClick={this.queryClickAdd.bind(this)}>查询添加流水</Button>
                <Button  type="primary" onClick={this.queryClickReduce.bind(this)}>查询消费流水</Button>
            </Breadcrumb>

            {console.log("totalItemData", totalItemData)}
            
            { totalItemData && 
                <Chart height={400} data={totalItemData} scale={cols} forceFit>
                    <Legend />
                    <Axis name="time" />
                    <Axis name="number" label={{formatter: val => `${val}`}}/>
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="line" position="time*number" size={2} color={'number'} />
                    <Geom type='point' position="time*number" size={6} shape={'circle'} color={'number'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>

            }
                
          </Content>
    );
  }
}

export default NFItemFlow;