/*
 * @Descripttion: 接口配置
 * @Author: Hades
 * @Date: 2020-05-20 10:32:53
 * @LastEditTime: 2020-11-11 14:02:26
 */ 
let serverUrl = ''

//let serverUrl1 = 'http://cqapi.iutme.com'
//判断运行环境
if(process.env.NODE_ENV === 'development'){
    //serverUrl = 'http://192.168.1.8:8061'
    serverUrl = 'http://account.留下的光.com' 
}else{
    serverUrl = 'http://account.留下的光.com'
}

export default {
    serverUrl,
    login:serverUrl+'/api/auth/login',//管理员登录
    shop:serverUrl+'/api/shop',//获取店铺
    billRecord:serverUrl+'/api/date/bill/record',//获取账单
    
}
