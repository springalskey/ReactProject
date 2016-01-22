import React from 'react';
import { Link} from 'react-router'
require("../../scss/common/components/InputBox.scss");

export default class InputBox extends React.Component {

    render() {
        return <ul className="inputBox" style={this.props.style}>
                    <li className="icon fl">
                        <img className="pwdIcon" src={this.props.icon} />
                    </li>
                    <li className="fl">
                        <input
                            maxLength={this.props.inputMaxLength}
                            type={this.props.inputType}
                            ref={this.props.inputRef}
                            id={this.props.inputRef}
                            placeholder={this.props.inputPlaceholder}
                        />
                    </li>
                </ul>
    }
}

InputBox.propTypes = {
    style: React.PropTypes.object,
    icon: React.PropTypes.string.isRequired,
    inputMaxLength: React.PropTypes.string,
    inputType: React.PropTypes.string.isRequired,
    inputRef: React.PropTypes.string.isRequired,
    inputPlaceholder: React.PropTypes.string
};