import React from 'react';
import { Link } from 'react-router';
import history from 'history/lib/createHashHistory';
import Header from "../common/Header.jsx";
import icon_alarm from "../../images/icon-alarm.png";
import icon_safe from "../../images/icon-safe.png";
import Progress from "../common/Progress.jsx";


require("../../scss/product/Purchase.scss");

export default class Purchase extends React.Component {

    constructor(){
        super();
        this.state = {};
        this._timer = null; //定时器
    }

    getProgressData(){
        return {
            id: 'progress',
            size: 7.5,
            yearRate: 12,
            progress: 70,
            duration: 2000,
            color: '#F43A4D',
            bgColor: "#F6C8C9",
            textColor: '#ea3e4f',
            progressWidth: 0.08,
            toFixed: 0
        };
    }

    componentDidMount (){
       this.ajaxHandler();
    }

    ajaxHandler(){
        $.ajax({
            url: "./purchase.json",
            dataType:"json",
            type:"get",
            success: (data) => {
                this.setState(data);
                this.countDown(data.remaindTime);
            }
        });
    }


    /**
     * 倒计时
     * @param time 抢购剩余时间（单位秒）
     */
    countDown(time){
        var count = 0; //花了多少时间，单位为秒
        this._timer = setInterval(()=>{
            var t = time-count;
            count += 1;
            if(t>=0){
                this.acc(t);
                if(t===0){
                    document.getElementById("purchaseButton").disabled = true;
                    clearInterval(this._timer);
                }
            }
        },1000);
    }

    /**
     * 计算
     * @param value单位秒
     * @return
     */
    acc(value){
        var second = parseInt(value);
        var day = 0; //天
        var hour = 0;// 分
        var minute = 0;// 小时
        if(second > 60) {
            day    = parseInt(parseInt(second/3600/24)); //天
            hour   = parseInt(second%(3600*24)/3600);//时
            minute = parseInt(second%(3600*24)%3600/60); //分
            second = parseInt(second%(3600*24)%3600%60); //秒
        }
        this.setTime(day, hour, minute, second);
    }

    setTime(day,hour,minute,second){
        document.getElementById("day").innerHTML = day;
        document.getElementById("hour").innerHTML = hour;
        document.getElementById("minute").innerHTML = minute;
        document.getElementById("second").innerHTML = second;
    }

    purchaseHandler(){
        history().pushState(null,"/purchaseAmount");
    }

    componentWillUnmount(){
        if(this._timer) window.clearInterval(this._timer);
    }

    render() {
        return <div id="purchasePane">

            <Header/>

            <div id="content">
                <div className="wrap-header">
                    <div id="productName">{this.state.productName}</div>
                    <div className="progressPane">
                        <Progress data={this.getProgressData()}/>
                    </div>
                    <p className="time">
                        <img src={icon_alarm} className="icon-alarm" />
                        <label id="day"></label>天
                        <label id="hour"></label>时
                        <label id="minute"></label>分
                        <label id="second"></label>秒
                    </p>
                    <p className="t-center" id="purchaseText"></p>
                </div>
                <div className="wrap-footer">
                    <ul className="purchaseInfo">
                        <li><label id="investPeriod">{this.state.investPeriod}</label>天期限</li>
                        <li><label id="investLower">{this.state.investLower}</label>元起购</li>
                        <li><label id="investTotalPerson">{this.state.totalInvestPerson}</label>人已购买</li>
                    </ul>
                    <button className="button-red" id="purchaseButton" onClick={this.purchaseHandler}>立即购买</button>
                </div>
                <p className="tips">
                    <img src={icon_safe} className="iconSafe"/>
                    <label className="tips-text">账户资金安全由银行和证大财富共同保障</label>
                </p>
            </div>
        </div>
    }
}