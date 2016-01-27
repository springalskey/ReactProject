import React from 'react';
import { Link } from 'react-router'
import Header from "../common/Header.jsx"
import friends from "../../images/share-friends.png"

require("../../scss/users/Invite.scss");

export default class Invite extends React.Component {

    constructor(){
        super();
        var bodyWidth = document.getElementById("app").clientWidth;
        this._size = (bodyWidth/16).toFixed(0)*8;
    }

    render(){
        return <div id="invitePane">

                <Header />

                <div id="content">
                    <p className="title">扫一扫 邀请好友来注册</p>
                    <QRcode size={this._size}/>
                    <p className="mycode">我的邀请码<label id="inviteCode">123456</label></p>
                    <div className="white">
                        <button className="button-red" id="getPointsButton" onClick={this.shareHandler.bind(this)}>邀请好友</button>
                    </div>
                </div>
                <div className="overlay hidden" ref="overlay"></div>
                <div className="share" ref="share" onClick={this.hideHandler.bind(this)}>
                    <img id="shareImg" src={friends} />
                    <h5 className="tips">
                        限仅支持微信6.1及以上版本
                    </h5>
                </div>
            </div>
    }

    shareHandler(){
        this.refs.overlay.style.display="block";
        this.refs.share.style.display="block";
    }

    hideHandler(){
        this.refs.overlay.style.display="none";
        this.refs.share.style.display="none";
    }
}

import QRCode from "../common/js/qrcode.js"
class QRcode extends React.Component {

    constructor(props){
        super();
        this._size = props.size;
    }

    render() {
        return <div ref="code" id="QRcode"></div>
    }

    componentDidMount(){
        $(this.refs.code).qrcode({
            render: "canvas", //table、canvas方式
            width : this._size,//设置宽高
            height : this._size,
            text: "http://localhost:8080/build/index.html?inviteCode=123456"
        });
        $(this.refs.code).css("width",this._size);
        $(this.refs.code).css("height",this._size);
    }

}
