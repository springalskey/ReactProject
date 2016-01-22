import React from 'react';
import { Link } from 'react-router'
import Header from "../common/Header.jsx"
import Store from '../common/js/Store.js';
import Grid from '../common/Grid.jsx';
import TransactionRecordItem from './TransactionRecordItem.jsx';

require("../../scss/users/TransactionRecord.scss");

export default class TransactionRecord extends React.Component {
    render() {

        var store = new Store({url:"./transactionRecord.json"});
        //var layout = [
        //    {filed:"id",name:"编号",style:{height:"1rem"}},
        //    {filed:"productName",name:"产品"},
        //    {filed:"orderId",name:"订单号"},
        //    {filed:"interest",name:"收益",formatter:function(value){
        //        return value+".00";
        //    }}
        //];
        return <div id="transactionRecordPane">
            <Header />

            <div id="gridPane">
                <Grid store={store} OuterGridItem={TransactionRecordItem}   /**layout={layout}**/ />
            </div>

        </div>
    }

    componentDidMount(){
        //document.addEventListener("touchmove",function(e){e.preventDefault();},false);
        //document.getElementById("gridPane").addEventListener("touchmove",function(e){e.stopPropagation();},false);
        //
        //document.getElementById("header").addEventListener("click", function(){
        //    alert(1);
        //    $(document).unbind();
        //    $(window).unbind();
        //},false);
    }
}


