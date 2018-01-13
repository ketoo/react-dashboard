import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb } from 'antd';
//import { DataSet } from 'antv';

//const {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;

import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Brush, Legend,
    ReferenceArea, ReferenceLine, ReferenceDot, ResponsiveContainer,
    LabelList, Label, Recharts } from 'recharts';

    
    const { Content } = Layout;

class NFMonitor extends React.Component {


  render() {
    const data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},

  ];
    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Monitor</Breadcrumb.Item>
            </Breadcrumb>

            <AreaChart width={1000} height={400} data={data}
                margin={{top: 10, right: 0, left: 100, bottom: 0}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
            </AreaChart>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                NFMonitor is a page.
            </div>
          </Content>
    );
  }
}

export default NFMonitor;