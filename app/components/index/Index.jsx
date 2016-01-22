import React from 'react';
import Header from "../common/Header.jsx"
import { Link } from 'react-router'

require("../../scss/index/index.scss");

export default class Index extends React.Component {
    render() {
        return <div id="indexPane">
            <Header />
            <ul>
                {!sessionStorage.getItem("cellphone")?<li className="bottom"><Link to="/login"><i className="index_icon1"></i>登录/注册</Link></li>:null}
                <li className="bottom"><Link to="/purchase"><i className="index_icon2"></i>限时抢购</Link></li>
                <li className="bottom"><Link to="/productList"><i className="index_icon3"></i>产品列表</Link></li>
                <li className="bottom"><Link to="/assets"><i className="index_icon4"></i>资产明细</Link></li>
                <li className="bottom"><Link to="/transactionRecord"><i className="index_icon5"></i>交易记录</Link></li>
                <li className="bottom"><Link to="/invite"><i className="index_icon6"></i>邀请好友</Link></li>
                <li className="bottom"><Link to="/personalSetting"><i className="index_icon7"></i>个人设置</Link></li>
                <li className="bottom"><Link to="/aboutUs"><i className="index_icon8"></i>关于我们</Link></li>
            </ul>
        </div>
    }
}