import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import { BackTop } from 'antd';
import { Card, Col, Row } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

const { Content } = Layout;

class NFAnalysisOperatePlatform extends React.Component {

  render() {
           // 数据源
        const data = [
            { time: '0', todayNumber: 275 },
            { time: '1', todayNumber: 275 },
            { time: '2', todayNumber: 115 },
            { time: '3', todayNumber: 120 },
            { time: '4', todayNumber: 350 },
            { time: '5', todayNumber: 350 },
            { time: '6', todayNumber: 350 },
            { time: '7', todayNumber: 350 },
            { time: '8', todayNumber: 350 },
            { time: '9', todayNumber: 350 },
            { time: '10', todayNumber: 350 },
            { time: '11', todayNumber: 350 },
            { time: '12', todayNumber: 350 },
            { time: '13', todayNumber: 1350 },
            { time: '14', todayNumber: 150 },
            { time: '15', todayNumber: 150 },
            { time: '16', todayNumber: 150 },
            { time: '17', todayNumber: 150 },
            { time: '18', todayNumber: 150 },
            { time: '19', todayNumber: 150 },
            { time: '20', todayNumber: 150 },
            { time: '21', todayNumber: 150 },
            { time: '22', todayNumber: 150 },
            { time: '23', todayNumber: 150 }
        ];
         // 定义度量
         const cols = {
            todayNumber: { alias: 'New users' },
            time: { alias: 'Workload' }
        };

        // 数据源
        const dataLine = [
            { hour: '1', value: 15468 },
            { hour: '2', value: 16100 },
            { hour: '3', value: 15900 },
            { hour: '4', value: 17409 },
            { hour: '5', value: 17000 },
            { hour: '6', value: 31056 },
            { hour: '7', value: 31982 },
            { hour: '8', value: 32040 },
            { hour: '9', value: 33233 },
            { hour: '10', value: 33233 },
            { hour: '11', value: 15468 },
            { hour: '12', value: 16100 },
            { hour: '13', value: 15900 },
            { hour: '14', value: 17409 },
            { hour: '15', value: 17000 },
            { hour: '16', value: 31056 },
            { hour: '17', value: 31982 },
            { hour: '18', value: 32040 },
            { hour: '19', value: 33233 },
            { hour: '20', value: 33233 },
            { hour: '21', value: 33233 },
            { hour: '22', value: 33233 },
            { hour: '23', value: 33233 }
          ];

          const colsLine={
            value: {
              min: 10000
            },
            hour: {
              range: [ 0 , 1 ]
            }
        };
       


    return (
      <Content style={{ margin: '0 16px' }}>
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
           
             <div>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                     <Breadcrumb.Item>负载信息 Workload information</Breadcrumb.Item>
                 </Breadcrumb>
             </div>

             <Chart width={900} height={400} data={data} scale={cols}>
                 <Axis name="time" />
                 <Axis name="todayNumber"/>
                 <Tooltip/>
                <Geom type="interval" position="time*todayNumber" color="todayNumber" />
            </Chart>

            <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
            {
                    <div>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>实时用户在线信息 Realtime user information</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                }

                 <Chart width={900} height={360} data={dataLine} scale={colsLine} >
                     <Axis name="year" />
                     <Axis name="value" label={{
                         formatter: val => {
                         return (val / 10000).toFixed(1) + 'k';
                         }
                     }} />
                     <Tooltip crosshairs={{type:'line'}}/>
                     <Geom type="area" position="hour*value" />
                     <Geom type="line" position="hour*value" size={2} />
                 </Chart>
            </div>
          </Content>
    );
  }
}

export default NFAnalysisOperatePlatform;