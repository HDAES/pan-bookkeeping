/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-05-20 10:11:34
 * @LastEditTime: 2020-11-11 13:08:07
 */

export const type = {
   COLLAPSED: 'COLLAPSED',//收起状态
   TOKEN:'TOKEN',
   USER:'USER',
   SHOPS:'SHOPS'
}

//改变登陆状态
export function changeToken(token){
   return {
      type:type.TOKEN,
      token
   }
}


//改变导航收起状态
export function changeCollapsed() {
   return {
      type: type.COLLAPSED
   }
}

//管理员用户信息
export function addUserInfo(user){
   return {
      type: type.USER,
      user
   }
}

//添加店铺信息
export function addShops(shops){
   return {
      type: type.SHOPS,
      shops
   }
}