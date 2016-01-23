import React from 'react';
import { Link } from 'react-router'
import Header from "../common/Header.jsx"
import ProductListItem from "./ProductListItem.jsx"

require("../../scss/product/ProductList.scss");

export default class ProductList extends React.Component {

    constructor(){
        super();
        this.state = {};
        this.state.data = [];
    }

    componentDidMount (){
        this.ajaxHandler();
    }

    ajaxHandler(){
        $.ajax({
            url: "./productList.json",
            dataType:"json",
            type:"get",
            success: (data)=> { this.setState({data: data}) }
        });
    }

    render() {
        return <div id="productListPane">
            <Header/>
            <div id="content">
                <div id="gridPane">
                {
                    this.state.data.map((item,key) => <ProductListItem data={item} key={key}/>)
                    }
                </div>
            </div>
        </div>
    }
}