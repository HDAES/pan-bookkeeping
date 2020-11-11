/*
 * @Descripttion: 页面布局
 * @Author: Hades
 * @Date: 2020-05-19 14:00:10
 * @LastEditTime: 2020-05-20 09:58:17
 */

import React from 'react'
import {Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menus from './components/layout/Menus'
import Header from './components/layout/Header'
import Set from './components/layout/Set'
export default ({ children }) => <Layout className="layout">
    <Menus />
    <Layout className="main">
        <Header />
        <Set/>
        <Scrollbars autoHide>
            <div className="content">
                {children}
            </div>
        </Scrollbars>
    </Layout>

</Layout>