/*
 * @Descripttion: 登陆页面
 * @Author: Hades
 * @Date: 2020-05-19 14:06:10
 * @LastEditTime: 2020-11-11 13:09:47
 */ 
import React from 'react'
import { Form, Input, Button } from 'antd'

import { connect } from 'react-redux'
import { changeToken,addUserInfo, addShops } from '../redux/action'
import { postLogin, getShops } from '../axios'
 export default connect()(({dispatch}) => {

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      };

      const onFinish = values => {
        
        postLogin(values).then(res =>{
            console.log(res)
            dispatch(changeToken(res.authorization))
            dispatch(addUserInfo(res.user))
            window.location.href='/#/index'

            getShops().then( res =>{
                dispatch(addShops(res))
            })
        })
      };
     return <div className="login">
         <div className="login-box">

        
         <h1>登陆</h1>
        <Form
            {...layout}
            onFinish={onFinish}
            className="form"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item   wrapperCol={{
          sm: { span: 7, offset: 17 },
        }}>
                <Button type="primary" htmlType="submit">
                登录
                </Button>
            </Form.Item>
        </Form>
        </div>
     </div>
 })