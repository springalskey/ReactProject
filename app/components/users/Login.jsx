import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';
import Header from "../common/Header.jsx";
import InputBox from "../common/InputBox.jsx";
import AlertMixin from "../common/mixin/AlertMixin.jsx";
import history from 'history/lib/createHashHistory';

import icon_phone from "../../images/icon-phone.png";
import icon_key from "../../images/icon-key.png";

require("../../scss/common/Button.scss");
require("../../scss/users/Login.scss");

class Login extends React.Component {

    render() {
        return <div id="loginPane">
            <Header />
            <div id="content">
                <div className="wrap-login">

                    <InputBox
                        icon={icon_phone}
                        inputType="tel"
                        inputRef="cellphoneInput"
                        inputPlaceholder="请输入手机号码"
                        inputMaxLength="11"
                    />

                    <InputBox
                        style={{marginTop: "1rem"}}
                        icon={icon_key}
                        inputType="password"
                        inputRef="passwordInput"
                        inputPlaceholder="请输入密码"
                        inputMaxLength="20"
                    />

                    <button className="button-red loginButton" id="loginButton" onClick={this.loginHandler.bind(this)}>登录</button>
                    <p><a>忘记密码</a></p>
                    <Link to="/register"><button className="button-border-red registerButton">免费注册</button></Link>
                </div>
            </div>
        </div>
    }

    loginHandler(){
        var cellphoneInput = ReactDom.findDOMNode(document.getElementById("cellphoneInput"));
        var passwordInput = ReactDom.findDOMNode(document.getElementById("passwordInput"));

        cellphoneInput.placeholder = "请输入手机号码";
        passwordInput.placeholder = "请输入密码";

        var cellphone = cellphoneInput.value;
        var password  = passwordInput.value;
        if(!cellphone){
            this.props.onShow("请输入手机号码！");
            return;
        }
        if(!password){
            this.props.onShow("请输入密码！");
            return;
        }
        //sessionStorage.setItem("cellphone", cellphone);
        //sessionStorage.setItem("password",  password);

        console.log(history());

        history().pushState(null,"/index");
    }
}

export default AlertMixin(Login);