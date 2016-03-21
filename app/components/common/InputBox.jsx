import React from 'react';
require("../../scss/common/components/InputBox.scss");

export default class InputBox extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return <ul className="inputBox" style={this.props.style}>
                    <li className="icon fl">
                        <img className="pwdIcon" src={this.props.icon} />
                    </li>
                    <li className="fl">
                        <input maxLength={this.props.maxLength}
                            type={this.props.type}
                            id={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            onChange={this.changeHandler.bind(this)}
                        />
                    </li>
                </ul>
    }

    changeHandler(e){
        let value = e.target.value;
        let obj = {};
        obj[this.props.name] = value;
        this.props.onChange(obj);
    }
}

InputBox.propTypes = {
    style: React.PropTypes.object,
    icon: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    maxLength: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string
};