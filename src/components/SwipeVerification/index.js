/*
 * @Descripttion:  滑动验证登陆
 * @Author: Hades
 * @Date: 2020-05-18 11:24:26
 * @LastEditTime: 2020-05-18 14:51:35
 */ 

import React, { useEffect,useState } from 'react';
import { Button } from 'antd';
import './index.css'
function SwipeVerification(){

    const [ex,setEx] = useState(0)
    const [isMovable,setIsMovable] = useState(false)
    useEffect(()=>{
        const canvas =document.getElementById("myCanvas");
        const ctx=canvas.getContext("2d");
        const img = new Image()
        img.src = 'http://blog.xl686.com/album/1587994945916.jpg'
        img.onload = function(){
            ctx.drawImage(img,10,10,380,180);
            ctx.beginPath();
            ctx.moveTo(ex+10,50);
            ctx.lineTo(ex+50,50);
            ctx.lineTo(ex+50,65);
            ctx.arc(ex+50,75,10,1.5*Math.PI,0.5*Math.PI);
            ctx.lineTo(ex+50,100);
            ctx.lineTo(ex+10,100);
            ctx.lineTo(ex+10,85);
            ctx.arc(ex+10,75,10,0.5*Math.PI,1.5*Math.PI,true);
            ctx.fillStyle="green";
            ctx.fill();
        }
       
    })


    function MoveStart(e){
        console.log(e)
        setIsMovable(true)
    }
    
    function MoveEnd(e){
       
        setIsMovable(false)
    }
    function onMoving(e){
        if(!isMovable){
            return 
        }
        setEx(e.clientX)
    }
    function onMoveEnd(e){
        setIsMovable(false)
    }
    return <div className="swipe-verification">
        <canvas id="myCanvas" width="400" height="200"></canvas>
        
        <div className="swipe" id="swipe"  onMouseMove={onMoving} onMouseLeave={onMoveEnd}>
            <div className="slider" style={{left:ex}} onMouseDown={MoveStart} onMouseUp={MoveEnd}></div>
        </div>

    </div>
}

export default SwipeVerification;