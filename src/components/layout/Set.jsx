import React, { useState } from 'react'
import { Drawer, Checkbox,Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons'
import { SketchPicker } from 'react-color'
export default () => {

    const [visible, setVisible] = useState(false)
    const [color,setColor] = useState('#1890ff')

    function changeColor({hex}){
        console.log(hex)

        setColor(hex)
    }

    return <div className="set" >

        <SettingOutlined style={{ fontSize: '32px', color: '#ffffff' }} onClick={() => setVisible(true)} />
        <Drawer
            title="Seting Center"
            placement="right"
            onClose={() => setVisible(false)}
            visible={visible}
        >
            <div className="theme-color">
                <span>Theme Color</span>
                <Checkbox defaultChecked />
            </div>
            <SketchPicker
                color={color }
                onChangeComplete={ changeColor }
            />
            <Button type="primary">132</Button>
        </Drawer>
    </div>
}