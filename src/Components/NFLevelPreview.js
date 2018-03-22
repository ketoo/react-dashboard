import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { DatePicker } from 'antd';
import { View , DataSet} from '@antv/data-set';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { Button, Dropdown, Icon, message } from 'antd';
import moment from 'moment';

import {queryCurrentLevel, queryLevel} from '../Services/NFBusinessAPI';

const { Content } = Layout;

@observer
class NFLevelPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: null }
        this.state = { curPlat: null }
        this.state = { curDate: null }
      }

    handleMenuClick(e) {   
        this.setState({curZone: e.key})
    }
    queryClick() {
        if (this.state.curZone == null)
        {
            message.error('Please input zone');
            return;
        }
        if (this.state.curDate == null)
        {
            this.state.curDate = moment();
        }
        

        queryLevel(this.state.curDate, this.state.curZone);

    }

    onChange(date, dateString) {
        if (dateString != null && dateString != "")
        {
            this.setState({curDate: dateString})
        }
      }

  render() {

    var levelZoneData;

    if (this.props.store.levelData)
    {
        levelZoneData = this.props.store.levelData.levelZoneData;
    }

    // 定义度量
    const cols = {
        level: { alias: '等级' },
        number: { alias: '数量' }
    };

        var platNewUser = ['1', '2', '3'];

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
                <Breadcrumb.Item>Home</Breadcrumb.Item>

                <Dropdown overlay={menuZoneList}>
                    <Button style={{ marginLeft: 8 }}>
                       区服 {this.state.curZone} <Icon type="down" />
                    </Button>
                </Dropdown>

                <DatePicker defaultValue={moment()}  onChange={this.onChange.bind(this)}/>

                <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>

            </Breadcrumb>
    
            { levelZoneData && 
                <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                {
                        <div>

                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        
                        <Chart height={400} data={levelZoneData} scale={cols} forceFit>
                            <Axis name="level" />
                            <Axis name="number"  label={{formatter: val => `${val}`}}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="line" position="level*number" size={2} />
                            <Geom type='point' position="level*number" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                        </Chart>

                        </div>
                }
                </div>   

            }  
          </Content>
    );
  }
}

export default NFLevelPreview;