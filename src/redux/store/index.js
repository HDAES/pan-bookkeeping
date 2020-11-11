/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-05-20 10:04:15
 * @LastEditTime: 2020-05-20 10:06:28
 */ 
import { createStore } from 'redux'
import reducer from '../reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default () => createStore(reducer,composeWithDevTools())