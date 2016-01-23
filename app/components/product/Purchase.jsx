import React from 'react';
//import $ from 'jquery';
import { Link } from 'react-router'
import Header from "../common/Header.jsx"
import icon_alarm from "../../images/icon-alarm.png";
import icon_safe from "../../images/icon-safe.png";
import Progress from "../common/Progress.jsx"

require("../../scss/product/Purchase.scss");

export default class Purchase extends React.Component {

    constructor(){
        super();
        this.state = {};
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
            success: (data) => { this.setState(data) }
        });
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
                        <label id="day">{this.state.day}</label>天
                        <label id="hour">{this.state.hour}</label>时
                        <label id="minute">{this.state.minute}</label>分
                        <label id="second">{this.state.second}</label>秒
                    </p>
                    <p className="t-center" id="purchaseText"></p>
                </div>
                <div className="wrap-footer">
                    <ul className="purchaseInfo">
                        <li><label id="investPeriod">{this.state.investPeriod}</label>天期限</li>
                        <li><label id="investLower">{this.state.investLower}</label>元起购</li>
                        <li><label id="investTotalPerson">{this.state.totalInvestPerson}</label>人已购买</li>
                    </ul>
                    <button className="button-red" id="purchaseButton">立即购买</button>
                </div>
                <p className="tips">
                    <img src={icon_safe} className="iconSafe"/>
                    <label className="tips-text">账户资金安全由银行和证大财富共同保障</label>
                </p>
            </div>
        </div>
    }
}