/*
 * @Descripttion: 路由配置文件
 * @Author: Hades
 * @Date: 2020-05-19 13:55:34
 * @LastEditTime: 2020-11-11 12:24:30
 */ 
import Layout from './Layout'
import Index from './pages/index'
import Bill from './pages/bill_management/bill'
 const Routes =[
    {path:'/', name:'layout', component:Layout, auth:false, routes:[
        {path:'/index', name:'index', component:Index, auth:true },
        {path:'/bill_management/bill', name:'bill', component:Bill, auth:true },
    ]}
 ]

 export default Routes;