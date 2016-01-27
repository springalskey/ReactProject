import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

require("../scss/common/reset.scss");
require("../scss/common/animate.scss");
require("../scss/common/common.scss");

export default class App extends React.Component {

    render() {
        return <div className="App">
            <ReactCSSTransitionGroup
                component="div"
                transitionName="pageTransition"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
              {React.cloneElement(this.props.children, {
                  key: this.props.location.pathname
              })}
            </ReactCSSTransitionGroup>
        </div>
    }

}