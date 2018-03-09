import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Calendar, Badge } from 'antd';
import { BackTop } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { DatePicker } from 'antd';

const { Content } = Layout;

class NFDailyNewUser extends React.Component {
    

  render() {

    function onChange(date, dateString) {
        console.log(date, dateString);
      }
            // 数据源
        const data = [
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


            <Chart width={900} height={400} data={data} scale={cols}>
                <Axis name="day" />
                <Axis name="user" />
                <Tooltip />
                <Geom type="interval" position="day*user" color="user" />
            </Chart>

            <div style={{ padding: 0, background: '#fff', minHeight: 360 }}>
            {

                platNewUser.map(function (keyValue) {
                return <div>

                    <Breadcrumb.Item>{keyValue}</Breadcrumb.Item>

                    <Chart height={320} width={900} data={data} scale={cols}>
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

export default NFDailyNewUser;