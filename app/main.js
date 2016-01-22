import React from 'react'
import { Router, Route,IndexRoute } from 'react-router'
import Index from './components/index/Index.jsx';
import App from './components/App.jsx';
import Login from "./components/users/Login.jsx"
import Register from "./components/users/Register.jsx"
import ProductList from "./components/product/ProductList.jsx"
import Purchase from "./components/product/Purchase.jsx"
import Assets from "./components/users/Assets.jsx"
import Invite from "./components/users/Invite.jsx"
import TransactionRecord from "./components/users/TransactionRecord.jsx"


//var DefaultRoute = Router.DefaultRoute;

let routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/index"        component={Index}/>
            <Route path="/login"        component={Login}/>
            <Route path="/register"     component={Register}/>
            <Route path="/productList"  component={ProductList}/>
            <Route path="/purchase"     component={Purchase}/>
            <Route path="/assets"       component={Assets}/>
            <Route path="/invite"       component={Invite}/>
            <Route path="/transactionRecord"       component={TransactionRecord}/>
        </Route>
    </Router>
);

main();

function main() {

    React.render(routes, document.getElementById('app'));
}
