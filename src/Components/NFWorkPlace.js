import React, { Component } from 'react';
import 'antd/dist/antd.min.css';

import { Layout, Menu, Breadcrumb } from 'antd';
import { BackTop } from 'antd';

const { Content } = Layout;

class NFWorkPlace extends React.Component {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>WorkPlace</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            NFWorkPlace is a page.
            </div>
          </Content>
    );
  }
}

export default NFWorkPlace;