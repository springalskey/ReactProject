import React from 'react';
import { Link } from 'react-router';
import ab1 from "../../images/aboutUs/1.jpg";
import ab2 from "../../images/aboutUs/2.jpg";
import ab3 from "../../images/aboutUs/3.jpg";
import ab4 from "../../images/aboutUs/4.jpg";
import ab5 from "../../images/aboutUs/5.jpg";
import ab6 from "../../images/aboutUs/6.jpg";

require("../../scss/users/AboutUs.scss");

export default class AboutUs extends React.Component {
    render() {

        return <div id="aboutUsPane">
                <ul>
                    <li>
                        <img src={ab1} className="fl icon" />
                        <div className="fl content box-sizing">
                            <span>“捞财宝”是上海证大爱特金融信息服务有限公司旗下的线上资产管理平台</span>
                        </div>
                    </li>

                    <li>
                        <img src={ab2} className="fl icon" />
                        <div className="fl content box-sizing">
                            <span>WWW.LAOCAIBAO.COM</span>
                        </div>
                    </li>
                    <li>
                        <img src={ab3} className="fl icon" />
                        <div className="fl content box-sizing">
                            <span>客服热线：400-096-6588<br/>服务时间：周一至周五09:00-18:00</span>
                        </div>
                    </li>
                    <li>
                        <img src={ab4} className="fl icon" />
                        <div className="fl content box-sizing">
                            <span>1943412854</span>
                        </div>
                    </li>
                    <li>
                        <img src={ab5} className="fl icon" />
                        <div className="fl content box-sizing">
                            <span>捞财宝理财平台</span>
                        </div>
                    </li>
                    <li>
                        <img src={ab6} className="fl icon" />
                        <div className="fl content box-sizing">
                            <span>lcbservice@laocaibao.com</span>
                        </div>
                    </li>
                </ul>

        </div>
    }
}
