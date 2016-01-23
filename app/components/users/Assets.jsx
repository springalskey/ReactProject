import React from 'react';
import { Link } from 'react-router';
import Header from "../common/Header.jsx";
import Store from '../common/js/Store.js';
import Grid from '../common/Grid.jsx';
import arrow from '../../images/arrow-right.png';

require("../../scss/users/Assets.scss");

export default class Assets extends React.Component {
    render() {

        var store = new Store({url:"./assets.json"});

        var layout = [
            {filed:"productName",name:"产品名称",style:{height:"2.5rem",width:"8rem"}},
            {filed:"yesterProfit",name:"昨日收益",formatter: (value)=>{
                return <div className="right"><label>昨日收益</label><label className='red'>{value}</label><label>元</label><img src={arrow}/></div>;
            }}
        ];

        return <div id="assetsPane">

            <Header />

            <div id="content">
                <div className="detail t-center">
                    <p className="c222">累计总资产(元)</p>
                    <span className="red mt5 f25" id="principalInterest">1000000.00</span>
                </div>
                <ul className="ul01">
                    <li><a>昨日收益(元)<span className="red f25" id="yesterdayInterest">20.00</span></a></li>
                    <li>总收益(元)<span className="red f25" id="totalInterest">200.00</span></li>
                </ul>
                <div className="bz c666">已到期赎回产品不在此处展示。</div>
                <div id="gridPane">
                    <Grid store={store} layout={layout} thead={false}/>
                </div>
            </div>
        </div>
    }
}