import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { BackTop } from 'antd';
import { Card, Col, Row } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

import { DatePicker } from 'antd';
import { Button, Dropdown, Icon, message } from 'antd';

import moment from 'moment';
import {queryOnlineData} from '../Services/NFBusinessAPI';

const { Content } = Layout;

@observer
class NFAnalysisOperatePlatform extends React.Component {
    constructor(props) {
        super(props);

        this.state = { curZone: "0" }
        this.state = { curPlat: "0" }
        this.state = { curDate: null }
      }
  
    handleMenuClick(e) {   
        this.setState({curZone: e.key})
    }

    queryClick() {
        if (this.state.curZone == null || this.state.curDate == null)
        {
            message.error('Please input zone and date');
            return;
        }

        queryOnlineData(this.state.curDate, this.state.curZone);
    }

    
    onChange(date, dateString) {
        if (dateString != null && dateString != "")
        {
            this.setState({curDate: dateString})
        }
    }

  render() {
           // 数据源
           var totalData ;
           var zoneData;
       
           if (this.props.store.onlineData)
           {
               totalData = this.props.store.onlineData.totalOnlineData;
               zoneData = this.props.store.onlineData.zoneOnlineData;
       
           }
  

         // 定义度量
         const colsLine = {
            number: { alias: 'Number' },
            time: { alias: 'Time' }
        };
       
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
            {this.props.store.zone &&
                this.props.store.zone.map((key) => (  
                    <Menu.Item key={key}>{key}</Menu.Item>
                )) 
            }
            </Menu>
          );
 

    return (
      <Content style={{ margin: '0 16px' }}>
      {
          /*
           <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                <Col span={8}>
                    <Card title="执行分析 Analyst" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="权限管理 Permission management" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户数据管理 User's data management" bordered={false}>
                        Card content
                    </Card>
                </Col>
                </Row>
            </div>
          */
      }
          
           
             <div>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                     <Breadcrumb.Item>用户在线信息</Breadcrumb.Item>

                     <Dropdown overlay={menu}>
                        <Button style={{ marginLeft: 8 }}>
                           区服 {this.state.curZone}
                            <Icon type="down" />
                        </Button>
                    </Dropdown>

                    <DatePicker onChange={this.onChange.bind(this)}/>

                    <Button  type="primary" onClick={this.queryClick.bind(this)}>查询</Button>
            

                 </Breadcrumb>
             </div>

             {totalData && 
            <Chart height={400} data={totalData} scale={colsLine} forceFit>
                 <Axis name="time" />
                 <Axis name="number"  label={{formatter: val => `${val}`}}/>
                 <Tooltip crosshairs={{type : "y"}}/>
                 <Geom type="line" position="time*number" size={2} />
                 <Geom type='point' position="time*number" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
             </Chart>
             }

             {zoneData &&
                      <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
                      { 
                      <div>
                          <Breadcrumb style={{ margin: '16px 0' }}>
                          </Breadcrumb>
  
                        <Chart height={400} data={zoneData} scale={colsLine} forceFit>
                            <Axis name="time" />
                            <Axis name="number"  label={{formatter: val => `${val}`}}/>
                            <Tooltip crosshairs={{type : "y"}}/>
                            <Geom type="line" position="time*number" size={2} />
                            <Geom type='point' position="time*number" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
                        </Chart>
                      </div>
                      }
                  </div> 
                    
             }
          </Content>
    );
  }
}

export default NFAnalysisOperatePlatform;