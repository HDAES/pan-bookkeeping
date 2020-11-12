/*
 * @Descripttion: 请求方法
 * @Author: Hades
 * @Date: 2020-05-20 10:35:49
 * @LastEditTime: 2020-11-12 11:06:54
 */ 

 import http from './http'
 import api from './api'

 

 //管理员登录
export async function postLogin(data){
   return http({
      method:'post',
      url:api.login,
      data
   })
}

export async function getShops(){
   return http({
      method:'get',
      url:api.shop
   })
}

export async function getBillRecord({starTime,endTime,shopId,page,size}){
   return http({
      method:'get',
      url:api.billRecord+`?starTime=${starTime}&endTime=${endTime}&shopId=${shopId}&page=${page}&size=${size}`
   })
}

export async function postBillAdd(data){
   return http({
      method:'post',
      url:api.billAdd,
      data,
      all:true
   })
}

