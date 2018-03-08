import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import { BackTop } from 'antd';

import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

const { Content } = Layout;

class NFDailyRetentionRatio extends React.Component {



  render() {
            // 数据源
        const data = [
            { genre: 'Sports', sold: 275, income: 2300 },
            { genre: 'Strategy', sold: 115, income: 667 },
            { genre: 'Action', sold: 120, income: 982 },
            { genre: 'Shooter', sold: 350, income: 5271 },
            { genre: 'Other', sold: 150, income: 3710 }
        ];
        
        // 定义度量
        const cols = {
            sold: { alias: '销售量' },
            genre: { alias: '游戏种类' }
        };

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>NFDailyRetentionRatio</Breadcrumb.Item>
            </Breadcrumb>
            
            <Chart width={600} height={400} data={data} scale={cols}>
                <Axis name="genre" />
                <Axis name="sold" />
                <Legend position="top" dy={-20} />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
            </Chart>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            NFDailyRetentionRatio is a page.
            </div>
          </Content>
    );
  }
}

export default NFDailyRetentionRatio;