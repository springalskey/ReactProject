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
        return <div id="transactionRecordPane">
            <Header />

            <div id="gridPane">
                <Grid store={store} OuterGridItem={TransactionRecordItem} />
            </div>

        </div>
    }

    componentDidMount(){

    }
}


