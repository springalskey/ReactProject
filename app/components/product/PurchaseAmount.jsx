import React from 'react';
import { Link } from 'react-router';
import AlertMixin from "../common/mixin/AlertMixin.jsx";
import Header from "../common/Header.jsx";
import icon_incrementAmt from "../../images/icon-incrementAmt.png";
import icon_i from "../../images/icon-i.png";

import icon_interestEndDate from "../../images/icon-interestEndDate.png";
import icon_interestStartDate from "../../images/icon-interestStartDate.png";
import icon_investLowerAmt from "../../images/icon-investLowerAmt.png";
import icon_investUpperAmt from "../../images/icon-investUpperAmt.png";

require("../../scss/product/PurchaseAmount.scss");

export default class PurchaseAmount extends React.Component {

    constructor(){
        super();
        this.product = {
            incrementAmt: 100000,
            investLowerAmt: 5000,
            investUpperAmt: 20000,
            interestStartDate:"2016-01-01",
            interestEndDate:"2016-12-12"
        }
    }

    render() {
        return <div id="purchaseAmountPane">
            <div className="wrap">
                <p className="pt1rem f14 font-white">输入购买金额（元）：</p>
                <div className="inputBox">
                    <input ref="amountInput" id="amountInput" maxLength="7"
                           placeholder="购买金额为1000的整倍数" className="amountInput box-sizing"/>
                    <div className="earningsPane">
                        <p className="label">预期收益：</p>
                        <span className="f16 font-ea3e4f" id="interest">0.00</span>元
                    </div>
                </div>
                <p className="pthalf f14 font-white">快速选择金额（元）：</p>
                <div className="optionalAmountPane">
                    <span onClick={this.setAmtHandler.bind(this,1000)}>1000元</span>
                    <span onClick={this.setAmtHandler.bind(this,3000)}>3000元</span>
                    <span onClick={this.setAmtHandler.bind(this,5000)}>5000元</span>
                    <span onClick={this.setAmtHandler.bind(this,10000)}>10000元</span>
                </div>
            </div>

            <div className="prompt">
                <img src={icon_i} />
                <div className="promptLabel">
                    <span>理财产品到期后一次性还本付息，本金及收益自动返回至您的银行卡，并通过短信消息通知您</span>
                </div>
            </div>

            <div className="inviteCode">
                <label>请填写邀请码：</label>
                <input id="inviteCodeInput" placeholder="请填写验证码（非必填）" />
            </div>

            <ul className="info">
                <li><img src={icon_incrementAmt} /><span className="text">可售金额</span><span className="last">{this.product.incrementAmt}元</span></li>
                <li><img src={icon_investLowerAmt} /><span className="text">起投金额</span><span className="last">{this.product.investLowerAmt}元</span></li>
                <li><img src={icon_investUpperAmt} /><span className="text">单笔投资上限</span><span className="last">{this.product.investUpperAmt}元</span></li>
                <li><img src={icon_interestStartDate} /><span className="text">起息日期</span><span className="last">{this.product.interestStartDate}</span></li>
                <li><img src={icon_interestEndDate} /><span className="text">到期日期</span><span className="last">{this.product.interestEndDate}</span></li>
            </ul>

            <div className="footer">
                <button className="button-red" id="purchaseButton" onClick={this.purchaseHandler.bind(this)}>立即抢购</button>
            </div>
        </div>
    }


    setAmtHandler(value){
        this.refs.amountInput.value = value;

    }

    purchaseHandler(){
        var value = this.refs.amountInput.value;
        if(this.valid(value)){
            this.props.onShow("正在提交……");
        }
    }

    valid(value){
        if(!value){
            this.props.onShow("请输入投资金额");
            return false;
        }
        var reg = /^[1-9][0-9]*0{3}$/;
        if (reg.test(value)){
            value = parseInt(value);
            if(value > this.product.investUpperAmt){
                this.props.onShow("不能大于单笔投资上限："+this.product.investUpperAmt);
                return false;
            }
            else if(value < this.product.investLowerAmt){
                this.props.onShow("不能小于单笔投资下限："+this.product.investLowerAmt);
                return false;
            }
            else if(value > this.product.incrementAmt){
                this.props.onShow("不能大于可售金额："+this.product.incrementAmt);
                return false;
            }
            else{
                return true;
            }
        }
        else{
            this.props.onShow("格式不正确，请输入一千的整倍数");
            return false;
        }
    }
}

export default AlertMixin(PurchaseAmount);