import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './NFLogin.css';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import { Spin } from 'antd';
import NFRootModel from '../Models/NFRootModel';
import {login} from '../Services/NFLoginAPI';

import logoImg from '../Images/logo.gif'

const FormItem = Form.Item;

@observer
class NFLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        login(values.userName, values.password);
      }
    });
  }
    render() {

  
      const { getFieldDecorator } = this.props.form;
      return (

        <div className="all_form">
          <img src={logoImg} alt='' width='200' height='200' />

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </div>
      );
    }
  }
  
  export default NFLoginForm;