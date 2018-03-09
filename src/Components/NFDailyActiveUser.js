import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { DatePicker } from 'antd';
import { View , DataSet} from '@antv/data-set';

const { Content } = Layout;

class NFDailyActiveUser extends React.Component {
    

  render() {

    function onChange(date, dateString) {
        console.log(date, dateString);
      }

      const { Chart, Axis, Geom, Tooltip, Legend } = window.BizCharts;

        const data = [
          
            { name:'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.' :39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
          
            { name:'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.' :34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4}
        ];

        const ds = new DataSet();
        const dv = ds.createView().source(data);

        dv.transform({
          type: 'fold',
          fields: [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.' ], // 展开字段集
          key: '月份', // key字段
          value: '月均降雨量', // value字段
        });

    // 数据源
    const dataSub = [
        { day: '1', user: 275, income: 2300 },
        { day: '2', user: 115, income: 667 },
        { day: '3', user: 120, income: 982 },
        { day: '4', user: 350, income: 5271 },
        { day: '5', user: 350, income: 5271 },
        { day: '6', user: 350, income: 5271 },
        { day: '7', user: 350, income: 5271 },
        { day: '8', user: 350, income: 5271 },
        { day: '9', user: 350, income: 5271 },
        { day: '10', user: 350, income: 5271 },
        { day: '11', user: 350, income: 5271 },
        { day: '12', user: 350, income: 5271 },
        { day: '13', user: 1350, income: 5271 },
        { day: '14', user: 150, income: 3710 }
    ];
    
    // 定义度量
    const cols = {
        user: { alias: '销售量' },
        day: { alias: '游戏种类' }
    };

        var platNewUser = ['1', '2', '3'];

    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <DatePicker onChange={onChange}/>
            </Breadcrumb>


            <Chart height={400} data={dv} forceFit>
                <Legend />
                <Axis name="月份" />
                <Axis name="月均降雨量" />
                <Tooltip />
                <Geom type='intervalStack' position="月份*月均降雨量" color={'name'} style={{stroke: '#fff',lineWidth: 1}} />
            </Chart>

            <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
            {

                platNewUser.map(function (keyValue) {
                return <div>

                    <Breadcrumb.Item>{keyValue}</Breadcrumb.Item>

                    <Chart height={320} width={900} data={dataSub} scale={cols}>
                    <Legend />
                    <Axis name="day" />
                    <Axis name="user" label={{formatter: val => `${val}°C`}}/>
                    <Tooltip crosshairs={{type : "y"}}/>
                    <Geom type="line" position="day*user" size={2} color={'city'} />
                    <Geom type='point' position="day*user" size={6} shape={'circle'} color={'city'} style={{ stroke: '#fff', lineWidth: 1}} />
                    </Chart>
                    </div>
                })
            }
            </div>   

          </Content>
    );
  }
}

export default NFDailyActiveUser;