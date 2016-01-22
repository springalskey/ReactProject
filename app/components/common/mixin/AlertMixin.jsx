import React,{ Component } from 'react';
import Alert from "../Alert.jsx"
require("../../../scss/common/components/Alert.scss");

function enhance(ComposedComponent) {
    class Enhance extends Component {

        constructor() {
            super();
            this.state = {
                visible: false,
                message: ""
            }
        }

        onClose(){
            this.setState({
                visible: false
            });
        }

        onShow(message){
            this.setState({
                visible: true,
                message: message
            });
        }
        render() {
            var alertDialog;
            if(this.state.visible){
                alertDialog = <Alert message={this.state.message} onClose={this.onClose.bind(this)}/>
            }

            return <span>
                <ComposedComponent state={this.state} onClose={this.onClose.bind(this)} onShow={this.onShow.bind(this)}/>
                {alertDialog}
            </span>;
        }
    };

    return Enhance;

}

export default enhance;