import React from 'react';
import LogoImg from "../../images/logo.png"
import HouseImg from "../../images/house.png"
import { Link } from 'react-router'

require("../../scss/common/Header.scss");

export default class Header extends React.Component {
    render() {
        return <div id="header">
            <Link to="/index"><img src={LogoImg} className="iconLogo"/></Link>
            <Link to="/index"><img src={HouseImg} className="iconHouse"/></Link>
        </div>
    }
}