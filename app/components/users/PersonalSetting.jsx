import React from 'react';
import { Link } from 'react-router';
import Header from "../common/Header.jsx"

require("../../scss/users/PersonalSetting.scss");

export default class PersonalSetting extends React.Component {
    render() {

        return <div id="personalSettingPane">

            <Header />

            <div id="content">
                <ul>
                    <li>帐户</li>
                    <li className="arrow"><a>修改密码</a></li>
                    <li>安全</li>
                    <li className="arrow">
                        <a id="link">实名认证</a>
                    </li>
                </ul>

                <a className="a-button">
                    <button className="button-red" id="logoutButton">退出登录</button>
                </a>
            </div>
        </div>

    }
}
