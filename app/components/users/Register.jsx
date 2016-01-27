import React from 'react';
import { Link } from 'react-router'
import Header from "../common/Header.jsx"
import InputBox from "../common/InputBox.jsx"
import AlertMixin from "../common/mixin/AlertMixin.jsx"
import history from 'history/lib/createHashHistory'

import icon_phone from "../../images/icon-phone.png";
import icon_key from "../../images/icon-key.png";
import icon_verificationCode from "../../images/icon-verificationCode.png";
import icon_inviteCode from "../../images/icon-inviteCode.png";

require("../../scss/common/Button.scss");
require("../../scss/users/Register.scss");

class Register extends React.Component {

    render() {

        return <div id="registerPane">

            <Header />

            <div id="content">
                <div className="wrap-register">

                    <InputBox
                        icon={icon_phone}
                        inputType="tel"
                        inputRef="cellphoneInput"
                        inputPlaceholder="请输入手机号码"
                        inputMaxLength="11"
                    />

                    <div className="inputBox mthalf">
                        <ul>
                            <li className="icon fl">
                                <img src={icon_verificationCode}/>
                            </li>
                            <li className="fl">
                                <input className="confirm fl" maxLength="6" name="validateCode" ref="validateCodeInput" placeholder="请填写验证码"/>
                                <button className="button-red" ref="getValidateCodeButton" id="getValidateCodeButton">获取验证码</button>
                            </li>
                        </ul>
                    </div>

                    <InputBox
                        style={{marginTop: ".5rem"}}
                        icon={icon_key}
                        inputType="password"
                        inputRef="passwordInput"
                        inputPlaceholder="请输入登录密码"
                        inputMaxLength="20"
                    />

                    <InputBox
                        style={{marginTop: ".5rem"}}
                        icon={icon_key}
                        inputType="password"
                        inputRef="rePasswordInput"
                        inputPlaceholder="请再次输入登录密码"
                        inputMaxLength="20"
                    />

                    <InputBox
                        style={{marginTop: "1rem"}}
                        icon={icon_inviteCode}
                        inputType="text"
                        inputRef="inviteCodeInput"
                        inputPlaceholder="请填写好友的邀请码（非必填）"
                        inputMaxLength="6"
                    />

                    <button className="button-red registerButton" id="registerButton" onClick={this.registerHandler.bind(this)}>注册</button>
                    <p>点击注册按钮表示您同意<a href="http://www.laocaibao.com" target="_blank"><span>《注册协议》</span></a></p>
                </div>
            </div>
        </div>
    }


    registerHandler(){
        var cellphoneInput = React.findDOMNode(document.getElementById("cellphoneInput"));
        var validateCodeInput = React.findDOMNode(this.refs.validateCodeInput);
        var passwordInput = React.findDOMNode(document.getElementById("passwordInput"));
        var rePasswordInput = React.findDOMNode(document.getElementById("rePasswordInput"));
        var inviteCodeInput = React.findDOMNode(document.getElementById("inviteCodeInput"));

        var cellphone = cellphoneInput.value;
        var password  = passwordInput.value;
        var validateCode= validateCodeInput.value;
        var rePassword = rePasswordInput.value;
        var inviteCode = inviteCodeInput.value;

        if(!cellphone){
            this.props.onShow("请输入手机号码！");
            return;
        }
        if(!validateCode){
            this.props.onShow("请输入手机验证码！");
            return;
        }
        if(!password){
            this.props.onShow("请输入密码！");
            return;
        }
        if(!rePassword){
            this.props.onShow("请输入确认密码！");
            return;
        }
        if(password!==rePassword){
            this.props.onShow("两次密码不一致！");
            return;
        }
        if(!inviteCode){
            this.props.onShow("请输入邀请码！");
            return;
        }

        //sessionStorage.setItem("cellphone", cellphone);
        //sessionStorage.setItem("password",  password);

        history().pushState(null,"/index");
    }
}

export default AlertMixin(Register);