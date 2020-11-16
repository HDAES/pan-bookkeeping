/*
 * @Descripttion: 封装请求方法
 * @Author: Hades
 * @Date: 2020-05-20 10:31:27
 * @LastEditTime: 2020-11-16 13:40:13
 */

import axios from 'axios'
import { Modal, message } from 'antd'

export default (options) => {
    return new Promise((resolve, reject) => {
        axios({
            url: options.url,
            method: options.method,
            timeout: 12000,
            data: options.data,
            headers:{
               "Authorization": sessionStorage.getItem('sessionTOKEN')===null?'': 'Bearer '+ sessionStorage.getItem('sessionTOKEN')
            },
            params: (options.data && options.data.params) || '',
        }).then((response) => {
            if (response.status === 200) {
                let res = response.data
                if (res.code === 200) {
                    if(options.all){
                        resolve(res)
                    }else{
                        resolve(res.data)
                    }
                   
                }else if(res.code === 201 ) {
                    resolve(res)
                    message.error(JSON.stringify(res.message))
                }else if(res.code === 401){
                    window.location.href='/#/login'
                }
            }
        }).catch(err => {
            console.log(err)
            Modal.warn({
                title: '提示',
                content: err.message
            })
        })
    })
}
