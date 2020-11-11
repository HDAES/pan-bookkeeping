/*
 * @Descripttion:   
 * @Author: Hades
 * @Date: 2020-05-20 10:07:37
 * @LastEditTime: 2020-11-11 13:25:26
 */
import { type } from "../action";

let token = sessionStorage.getItem('sessionTOKEN') ? sessionStorage.getItem('sessionTOKEN') : '';
let user =JSON.parse(sessionStorage.getItem('sessionUser')) ? JSON.parse(sessionStorage.getItem('sessionUser')) : '';
let shops =JSON.parse(sessionStorage.getItem('sessionShop')) ? JSON.parse(sessionStorage.getItem('sessionShop')) : '';
const initialState = {
  token,
  collapsed: false, //收起左边导航
  user,  //管理员用户信息
  shops,//店铺信息
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.COLLAPSED:
      return {
        ...state,
        collapsed: !state.collapsed
      }
    case type.TOKEN:
      sessionStorage.setItem('sessionTOKEN', action.token)
      return {
        ...state,
        token: action.token
      }
    case type.USER:
       sessionStorage.setItem('sessionUser', JSON.stringify(action.user))
      return {
        ...state,
        user:action.user
      }
    case type.SHOPS:
      sessionStorage.setItem('sessionShop', JSON.stringify(action.shops))
      return {
        ...state,
        shops: action.shops
      }
    default:
      return {
        ...state
      }
  }
}