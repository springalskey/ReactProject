/**
 * Created by yanfl on 2015/12/7.
 */
import React from 'react';
import { Link} from 'react-router'
require("../../scss/common/components/InputBox.scss");

export default class Progress extends React.Component {

    constructor(){
        super();
    }

    componentDidMount (){
        this.circleProgress(this.props.data);
    }

    circleProgress (options) {
        if (options.progress !== 0) {
            options.progress = options.progress || 100;
        }
        if (options.duration !== 0) {
            options.duration = options.duration || 1000;
        }
        options.fps = 60;    // requestAnimationFrame / cancelAnimationFrame
        options.color = options.color || 'rgb(52, 145, 204)';
        options.bgColor = options.bgColor || 'rgb(230, 230, 230)';
        options.textColor = options.textColor || 'black';
        options.progressWidth = options.progressWidth || 0.25; //r
        options.fontScale = options.fontScale || 0.4; //r

        options.toFixed = options.toFixed || 0;
        var canvas = this.refs.progress;
        if (canvas == null || canvas.getContext == null) {
            return;
        }
        options.width = canvas.width;
        options.height = canvas.height;
        options.context = canvas.getContext('2d');

        var step = function () {
            if (options.current < options.progress && options.duration > 0) {
                this.drawCircleProgress(options);
                options.current += options.progress * (1000 / options.fps) / options.duration;
                canvas.setAttribute('data-requestID', window.setTimeout(step, 1000 / 60));
            } else {
                options.current = options.progress;
                this.drawCircleProgress(options);
                canvas.removeAttribute('data-requestID');
            }
        }.bind(this);

        window.clearTimeout(canvas.getAttribute('data-requestID'));
        options.current = 0;
        step();
    }

    drawCircleProgress (options) {
        var ctx = options.context;
        var width = options.width;
        var height = options.height;
        var current = options.current;
        var color = options.color;
        var bgColor = options.bgColor;
        var textColor = options.textColor;
        var progressWidth = options.progressWidth;
        var fontScale = options.fontScale;

        //console.log(width);
        var x = width / 2;
        var y = height / 2;
        var r1 = Math.floor(Math.min(width, height) / 2);
        var r2 = Math.floor(r1 * (1 - progressWidth));
        var startAngle = -Math.PI / 2;
        var endAngle = startAngle + Math.PI * 2 * current / 100;
        var fontSize = Math.floor(r1 * fontScale);

        ctx.save();
        ctx.clearRect(0, 0, width, height);


        //画出圆形
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r1, startAngle, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = bgColor;
        ctx.fill();

        //画出旋转进度弧形
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r1, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        //画出圆环
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, r2, startAngle, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();

        ctx.fillStyle = textColor;
        if(!options.text){
            ctx.font = '' + (fontSize/2.5) + 'px arial, sans serif';
            ctx.textBaseline = 'bottom';
            ctx.textAlign = 'center';
            //console.log(x+":"+y);
            ctx.fillText('预期年化收益率', x, width/2.4);


            ctx.font = '' + fontSize + 'px arial, sans serif';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';
            //显示进度
            ctx.fillText(options.yearRate+"%",x, width/2.2);

        }
        else{
            ctx.font = '' + fontSize/1.1 + 'px Microsoft YaHei';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(options.text, x, y);
        }
        ctx.restore();
    }


    render() {
        var bodyWidth = document.body.clientWidth;
        var v = bodyWidth/16;
        var isAndroid = window.navigator.appVersion.match(/android/gi);
        var isIPhone = window.navigator.appVersion.match(/iphone/gi);
        var t; //这里其实是size，因为在手机端会模糊，所以放大两倍，css控制在原来的大小即可。在PC上还是需要用7.5才行
        if (isIPhone || isAndroid) {
            t = this.props.data.size*2;
        } else {
            t = this.props.data.size;
        }
        var size = (t*v)+"rem";
        return <div className="outProgress">
            <canvas width={size} height={size} className="progress" ref="progress"></canvas>
        </div>
    }
}

Progress.propTypes = {
    data: React.PropTypes.object.isRequired //data attr
};