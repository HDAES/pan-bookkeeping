/*
 * @Descripttion: 订单
 * @Author: Hades
 * @Date: 2020-11-11 12:23:23
 * @LastEditTime: 2020-11-12 11:08:26
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { Card, Select, Form, DatePicker, Button, Table, Modal, Input, message } from 'antd';
import { connect } from 'react-redux'

import { getBillRecord,postBillAdd } from '../../../axios/index'
import { formateMoneyType } from '../../../utils'
const mapStateToProps = state => {
    return {
        shops: state.shops
    }
}

export default connect(mapStateToProps)(({ shops }) => {


    const [shopId, setShopId] = useState(shops[0].id)    //店铺ID
    const [billList, setBillList] = useState()   //账单列表
    const [loading, setLoading] = useState(false) //表格加载状态
    const [billStatistics, SetBillStatistics] = useState({ allMoney: 0, incomeMoney: 0, paymentMoney: 0 })
    const [times, SetTimes] = useState(['', ''])
    const [editVisible, SetEditVisible] = useState(false) //添加或者修改弹窗
    const [isAdd,SetIsAdd] = useState(true) // true 添加 false  修改
    const [paginationInfo, setPaginationInfo] = useState({
        page: 1,
        total: 0,
        pageSize: 50
    })
    const [form] = Form.useForm();

    const [billFrom] = Form.useForm();

    useEffect(() => {
        bill(shopId, paginationInfo.page, paginationInfo.pageSize, times[0], times[1])
    }, [shopId, paginationInfo.page, paginationInfo.pageSize, times])

    function bill(shopId, page, size, starTime, endTime) {
        setLoading(true)
        getBillRecord({ shopId: shopId, page, size, starTime, endTime }).then(res => {
            setLoading(false)
            setBillList(res.pageInfo.list)
            setPaginationInfo({
                page: res.pageInfo.pageNum,
                total: res.pageInfo.total,
                pageSize: res.pageInfo.pageSize
            })
            SetBillStatistics({ allMoney: res.allMoney, incomeMoney: res.incomeMoney, paymentMoney: res.paymentMoney })
        })
    }

    //添加账单
    // function addBill(){
    //     console.log(123)
    // }
    //保存或者添加
    function handleSava() {
        billFrom.validateFields().then(value => {
            if(isAdd){
                postBillAdd(value).then( res =>{
                    if(res.code === 200){
                        SetEditVisible(false)
                        message.success('添加成功')
                    }
                })
            }
         })
    }
    //完成筛选
    function onFinish(fieldsValue) {
        setShopId(fieldsValue.shopId)
        SetTimes([moment(fieldsValue.times[0]).format('YYYY-MM-DD'), moment(fieldsValue.times[1]).format('YYYY-MM-DD')])
    }
    //表格底部fotter
    function footer() {
        return <div>
            总收入（元）：<span style={{ color: 'red', marginRight: 20 }}>{billStatistics.incomeMoney}</span>
            总支出（元）：<span style={{ color: 'green', marginRight: 20 }}>{billStatistics.paymentMoney}</span>
            总利润（元）：<span style={{ color: 'yellow' }}>{billStatistics.allMoney}</span>
        </div>
    }
    //切换页码
    function changePage(page) {
        setPaginationInfo({
            ...paginationInfo,
            page
        })
    }
    //改变 长度
    function changeSize(current, pageSize) {
        setPaginationInfo({ ...paginationInfo, pageSize })
    }
    const columns = [
        {
            title: '店铺名字',
            dataIndex: 'shopName',
            key: 'shopName',
        },
        {
            title: '金额（元）',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '收支',
            dataIndex: 'type',
            key: 'type',
            render: type => type === 1 ? <div style={{ color: 'red' }}>收入</div> : <div style={{ color: 'green' }}>支出</div>
        },
        {
            title: '支付方式',
            dataIndex: 'moneyType',
            key: 'moneyType',
            render: moneyType => <div>{formateMoneyType(moneyType)}</div>
        },
        {
            title: '修改次数',
            dataIndex: 'updateCount',
            key: 'updateCount',
        },


        {
            title: '账单日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
    ]
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 },
    };
    return <div className="bill">
        <Card >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Form layout="inline" onFinish={onFinish} form={form}>
                    <Form.Item label="店铺名字" name="shopId" initialValue={shops[0].id} >
                        <Select style={{ width: 200 }}>
                            {
                                shops.map(item => {
                                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="时间" name="times">
                        <DatePicker.RangePicker style={{ marginRight: 20 }} size="middle" />
                    </Form.Item>
                    <Form.Item >
                        <Button size="middle" htmlType="submit">筛选</Button>
                        <Button size="middle" style={{ marginLeft: 20 }}>取消</Button>
                    </Form.Item>
                </Form>

                <Button onClick={()=>{SetEditVisible(true);SetIsAdd(true)}}>新增</Button>
            </div>
        </Card>
        <Table
            style={{ marginTop: 20 }}
            columns={columns}
            loading={loading}
            dataSource={billList}
            rowKey={record => record.id}
            footer={() => footer()}
            pagination={{
                current: paginationInfo.page,
                total: paginationInfo.total,
                pageSize: paginationInfo.pageSize,
                onChange: changePage,
                onShowSizeChange: changeSize
            }}
        />
        <Modal
            title={isAdd?'添加':'修改'}
            visible={editVisible}
            onOk={handleSava}
            onCancel={()=>SetEditVisible(false)}
        >
            <Form form={billFrom} {...layout}>
                <Form.Item label="店铺名字" name="shopId" rules={[{ required: true, message: '请选择店铺' }]}>
                    <Select placeholder="Select a shop">
                        {
                            shops.map(item => {
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="金额(元)" name="money" rules={[{ required: true, message: '请输入金额' }]}>
                    <Input placeholder="Input money" />
                </Form.Item>
                <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
                    <Select placeholder="Select a type">
                        <Select.Option key={0} value={1}>收入</Select.Option>
                        <Select.Option key={1} value={2}>支出</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="金额类型" name="moneyType" rules={[{ required: true, message: '请选择金额类型'}]}>
                    <Select placeholder="Select a moneyType">
                        <Select.Option key={0} value={1}>美团</Select.Option>
                        <Select.Option key={1} value={2}>微信支付宝</Select.Option>
                        <Select.Option key={2} value={3}>优惠券</Select.Option>
                        <Select.Option key={3} value={4}>现金</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="订单时间" name="date" rules={[{ required: true, message: '请选择订单时间'}]}>
                    <DatePicker  />
                </Form.Item>
                <Form.Item label="具体描述" name="content" rules={[{ required: true, message: '请输入具体描述'}]}>
                    <Input.TextArea showCount maxLength={100} placeholder="Input specific description " />
                </Form.Item>
            </Form>
        </Modal>

    </div>
}) 