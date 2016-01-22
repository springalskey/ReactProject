import React from 'react';
import { Link } from 'react-router'

require("../scss/common/reset.scss");
require("../scss/common/common.scss");
require("../scss/common/animate.scss");

export default class App extends React.Component {

    render() {
        return <div className="App">
            {this.props.children}
        </div>
    }
}