import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';
import Header from "../common/Header.jsx";
import InputBox from "../common/InputBox.jsx";
import AlertMixin from "../common/mixin/AlertMixin.jsx";
import history from 'history/lib/createHashHistory';
import assign from 'object-assign';

import icon_phone from "../../images/icon-phone.png";
import icon_key from "../../images/icon-key.png";

require("../../scss/common/Button.scss");
require("../../scss/users/Login.scss");


class Login extends React.Component {

    constructor(props){
        super(props);
        this.data = {};
    }

    render() {
        return <div id="loginPane">
            <Header />
            <div id="content">
                <div className="wrap-login">

                    <InputBox
                        icon={icon_phone}
                        type="tel"
                        placeholder="请输入手机号码"
                        maxLength="11"
                        name = "mobile"
                        onChange = {this.changeHandler.bind(this)}
                    />

                    <InputBox
                        style={{marginTop: "1rem"}}
                        icon={icon_key}
                        type="password"
                        placeholder="请输入密码"
                        maxLength="20"
                        name = "password"
                        onChange = {this.changeHandler.bind(this)}
                    />

                    <button className="button-red loginButton" id="loginButton" onClick={this.loginHandler.bind(this)}>登录</button>
                    <p><a>忘记密码</a></p>
                    <Link to="/register"><button className="button-border-red registerButton">免费注册</button></Link>
                </div>
            </div>
        </div>
    }

    changeHandler(data){
        assign(this.data,data);
    }

    loginHandler(){
        if(!this.data.mobile){
            this.props.onShow("请输入手机号码！");
            return;
        }
        if(!this.data.password){
            this.props.onShow("请输入密码！");
            return;
        }
        //sessionStorage.setItem("cellphone", cellphone);
        //sessionStorage.setItem("password",  password);

        history().pushState(null,"/index");
    }
}

export default AlertMixin(Login);