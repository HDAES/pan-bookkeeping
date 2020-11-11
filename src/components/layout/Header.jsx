/*
 * @Descripttion: 页面布局头部
 * @Author: Hades
 * @Date: 2020-05-19 14:26:14
 * @LastEditTime: 2020-06-18 15:54:03
 */

import React, { useState } from "react";
import { connect } from 'react-redux'
import { Badge, Avatar, Dropdown, Menu, Layout } from "antd";
import { FullscreenOutlined, BellOutlined, UserOutlined, FullscreenExitOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { changeCollapsed } from "../../redux/action";
import config from '../../basic_config.js'
const { Header } = Layout;

const mapStateToProps = state =>{
  return {
      collapsed:state.collapsed,
      user:state.user
  }
}

export default connect(mapStateToProps)(({collapsed,user,dispatch}) => {
  const [full, setFull] = useState(false);
  function handleFull() {
    let dos = document.documentElement;
    if (full) {
      if (document.exitFullScreen) {
        document.exitFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setFull(false);
    } else {
      if (dos.requestFullscreen) {
        dos.requestFullscreen();
      } else if (dos.mozRequestFullScreen) {
        dos.mozRequestFullScreen();
      } else if (dos.webkitRequestFullScreen) {
        dos.webkitRequestFullScreen();
      }
      setFull(true);
    }
  }

  function handleClick(e) {
    switch (e.key) {
      case '1':
        window.open('https://www.wanqingdan.com/')
        break;
      case '2':
        window.open('https://github.com/panpan1144/todo/tree/todo-react-admin')
        break;
      case '3':
        window.location.href = '/#/index'
        break;
      case '4':
        window.location.href = '/#/login'
        sessionStorage.removeItem('sessionTOKEN')
        break;
      default:
        break;
    }
  }
  //改变导航收起状态
  function handleCollapsed(){
    dispatch(changeCollapsed())
  }

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1">关于玩清单</Menu.Item>
      <Menu.Item key="2">项目仓库</Menu.Item>
      <Menu.Item key="3">返回首页</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">退出登录</Menu.Item>
    </Menu>
  );
  console.log('header  render')
  return (
    <Header className="header">
      {
        collapsed? <MenuUnfoldOutlined style={{fontSize:24}} onClick={handleCollapsed}/>:
        <MenuFoldOutlined style={{fontSize:24}} onClick={handleCollapsed}/>
      }
     
      
      <div className="right">
        {
          full ? <FullscreenExitOutlined className="icon-btn" onClick={handleFull} /> : <FullscreenOutlined className="icon-btn" onClick={handleFull} />
        }


        <Badge dot>
          <BellOutlined className="icon-btn" />
        </Badge>

        <Dropdown overlay={menu} >
        <div className="avatar" > 
          {user.image===''?<Avatar size={36} icon={<UserOutlined />} />:<Avatar size={36} src={config.imageHeader+user.image}/> }
          
          <span style={{ marginLeft: 10 }}>{user.name}</span>
        </div>
        </Dropdown>
      </div>
    </Header>
  );
})