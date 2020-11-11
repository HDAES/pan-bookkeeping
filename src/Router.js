/*
 * @Descripttion: 路由
 * @Author: Hades
 * @Date: 2020-05-19 13:51:40
 * @LastEditTime: 2020-09-28 14:28:59
 */ 

import React from 'react'
import Routes from './router.config'
import Login from './pages/login'
import { connect } from 'react-redux'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

const mapStateToProps = state =>{
    return {
        token:state.token
    }
}
export default connect(mapStateToProps)(({token}) => {
    if(token===''){
        window.location.href='/#/login'
    }
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login}/>
                {
                    RouteWithSubRoutes(Routes)
                }
            </Switch>
        </Router>
    )
})

function RouteWithSubRoutes(RoutesList){
    return RoutesList.map( (item, index) =>{
        if(item.routes){
            return <Route path={item.path} key={index} render={ () =>{
                if(item.component!=null){
                    return <item.component>
                        { RouteWithSubRoutes(item.routes)}
                    </item.component>
                }
            }}/>
        }else{
            return  item.auth?<Route  {...item} key={index}/>
            : <Route path={item.path}  render={ () => <Redirect to="/login"/>} key={index}/>
        }
    })
}