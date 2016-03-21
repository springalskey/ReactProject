import React from 'react';
import { Link } from 'react-router'
import Header from "../common/Header.jsx"
import InputBox from "../common/InputBox.jsx"
import AlertMixin from "../common/mixin/AlertMixin.jsx"
import history from 'history/lib/createHashHistory'
import assign from 'object-assign';

import icon_phone from "../../images/icon-phone.png";
import icon_key from "../../images/icon-key.png";
import icon_verificationCode from "../../images/icon-verificationCode.png";
import icon_inviteCode from "../../images/icon-inviteCode.png";

require("../../scss/common/Button.scss");
require("../../scss/users/Register.scss");

class Register extends React.Component {

    constructor(props){
        super(props);
        this.data = {};
    }

    render() {

        return <div id="registerPane">

            <Header />

            <div id="content">
                <div className="wrap-register">

                    <InputBox
                        icon={icon_phone}
                        type="tel"
                        placeholder="请输入手机号码"
                        maxLength="11"
                        name = "mobile"
                        onChange = {this.changeHandler.bind(this)}
                    />

                    <div className="inputBox mthalf">
                        <ul>
                            <li className="icon fl">
                                <img src={icon_verificationCode}/>
                            </li>
                            <li className="fl">
                                <input className="confirm fl" maxLength="6" name="validateCode" type="tel"
                                    ref="validateCodeInput" placeholder="请填写验证码" onChange={this.validateCodeHandler.bind(this)}/>
                                <button className="button-red" ref="getValidateCodeButton" id="getValidateCodeButton">获取验证码</button>
                            </li>
                        </ul>
                    </div>

                    <InputBox
                        style={{marginTop: ".5rem"}}
                        icon={icon_key}
                        type="password"
                        placeholder="请输入登录密码"
                        maxLength="20"
                        name = "password"
                        onChange = {this.changeHandler.bind(this)}
                    />

                    <InputBox
                        style={{marginTop: ".5rem"}}
                        icon={icon_key}
                        type="password"
                        placeholder="请再次输入登录密码"
                        maxLength="20"
                        name = "rePassword"
                        onChange = {this.changeHandler.bind(this)}
                    />

                    <InputBox
                        style={{marginTop: "1rem"}}
                        icon={icon_inviteCode}
                        type="text"
                        placeholder="请填写好友的邀请码（非必填）"
                        maxLength="6"
                        name = "inviteCode"
                        onChange = {this.changeHandler.bind(this)}
                    />

                    <button className="button-red registerButton" id="registerButton" onClick={this.registerHandler.bind(this)}>注册</button>
                    <p>点击注册按钮表示您同意<a href="http://www.laocaibao.com" target="_blank"><span>《注册协议》</span></a></p>
                </div>
            </div>
        </div>
    }

    changeHandler(data){
        assign(this.data,data);
    }

    validateCodeHandler(e){
        assign(this.data,{validateCode:e.target.value});
    }

    registerHandler(){
        if(!this.data.mobile){
            this.props.onShow("请输入手机号码！");
            return;
        }
        if(!this.data.validateCode){
            this.props.onShow("请输入手机验证码！");
            return;
        }
        if(!this.data.password){
            this.props.onShow("请输入密码！");
            return;
        }
        if(!this.data.rePassword){
            this.props.onShow("请输入确认密码！");
            return;
        }
        if(this.data.password!==this.data.rePassword){
            this.props.onShow("两次密码不一致！");
            return;
        }
        if(!this.data.inviteCode){
            this.props.onShow("请输入邀请码！");
            return;
        }

        //sessionStorage.setItem("cellphone", cellphone);
        //sessionStorage.setItem("password",  password);

        history().pushState(null,"/index");
    }
}

export default AlertMixin(Register);