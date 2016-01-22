import React from 'react';
require("../../scss/common/components/Alert.scss");

export default class Alert extends React.Component {

    render() {

        return <div id="Alert" className="animated fadeIn" ref="AlertDom">
            <div className="dialog">
                <div className="message">{this.props.message}</div>
                <button className="confirmButton" onClick={this.confirmHandler.bind(this)}>确定</button>
            </div>
        </div>
    }

    confirmHandler(){
        var AlertDom = React.findDOMNode(this.refs.AlertDom);
        AlertDom.className = "animated fadeOut";
        AlertDom.addEventListener("webkitAnimationEnd",()=>{ this.props.onClose(); },false);
        AlertDom.addEventListener("transitionend",()=>{ this.props.onClose(); },false);

    }
}

Alert.propTypes = {
    message: React.PropTypes.string.isRequired,  //messagetext
    onClose: React.PropTypes.func.isRequired     //callback close dialog
};