/*
 * @Descripttion: 左边导航栏
 * @Author: Hades
 * @Date: 2020-05-19 14:27:34
 * @LastEditTime: 2020-11-11 16:38:25
 */

import React from 'react'
import { Menu, Layout } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { changeCollapsed } from "../../redux/action";
import { ApartmentOutlined,CrownOutlined } from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;
const mapStateToProps = state => {
    return {
        collapsed: state.collapsed
    }
}

export default connect(mapStateToProps)(({ collapsed, dispatch }) => {

    return <Sider className="menus" collapsible collapsed={collapsed} onCollapse={() => dispatch(changeCollapsed())}>
        <Link to="/index" className="logo">
            bill  {collapsed ? null : <span>admin</span>}
        </Link>

        <Menu theme="dark" mode="inline" className="my-menus">
            <Menu.Item key="1" >
                <Link to="/index" >
                    首页
                </Link>
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <ApartmentOutlined />
                        <span>权限管理</span>
                    </span>
                }
            >
                <Menu.Item key="3">用户组</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={
                    <span>
                        <CrownOutlined />
                        <span>账单管理</span>
                    </span>
                }
            >
                <Menu.Item key="8"> <Link to="/bill_management/bill">账单</Link></Menu.Item>
            </SubMenu>
            
        </Menu>
    </Sider>
})