/*
 * @Descripttion: 工具方法
 * @Author: Hades
 * @Date: 2020-05-23 15:21:26
 * @LastEditTime: 2020-11-11 15:59:10
 */ 

 export function timestampToTime(timestamp) {
    var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() <10?'0'+date.getDate()+ ' ':date.getDate()+ ' ';
    var h = date.getHours() <10?'0'+date.getHours()+ ':':date.getHours()+ ':';
    var m = date.getMinutes()<10?'0'+date.getMinutes() + ':':date.getMinutes() + ':';
    var s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
    return Y+M+D+h+m+s;
}


export function formateMoneyType(id){
    switch(id){
        case 1 :
            return "美团";
        case 2 :
            return "微信支付宝";
        case 3 :
            return "优惠券";
        case 4 :
            return "现金";
        default :
            return "未知"
    }
}