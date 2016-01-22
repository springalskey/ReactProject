import React from 'react';
import { Link } from 'react-router'
import arrow from "../../images/arrow-right.png"
import Progress from "../common/Progress.jsx"

export default class ProductListItem extends React.Component {

    showInfoHandler(productId){
        alert("查看详情"+productId)
    }

    getProgressData(){
        return {
            id: 'progress',
            size: 3.5,
            yearRate: this.props.data.yearRate,
            progress: this.props.data.progress,
            duration: 2000,
            color: '#F43A4D',
            bgColor: "#F6C8C9",
            textColor: '#ea3e4f',
            progressWidth: 0.08,
            toFixed: 0
        };
    }

    showAgreementHandler(){
        alert("投资协议")
    }

    render() {
        var hotSale;
        if(this.props.data.hotSellFlag==="1") hotSale = <span className='hotSale'>热销</span>;
        else hotSale = <span></span>;

        return <div className="wrap">
                <div className='top box-sizing'>
                    <span>{this.props.data.productName}</span>
                    {hotSale}
                    <span className='gray'>到期还本付息</span>
                    <span className='projectInfo' onClick={this.showInfoHandler.bind(this,this.props.data.productId)}>
                        <label classNmae="productInfoText">项目详情</label>
                        <img src={arrow} className='r_arrow' />
                    </span>
                </div>
                <div className='center box-sizing'>
                    <div className='box1'>
                        <span className='gray'>年化收益率</span>
                        <span>
                            <label>{this.props.data.yearRate}</label>
                            <label>%</label>
                        </span>
                        <span className='gray'>
                            <label>已购人数：</label>
                            <label className='black'>{this.props.data.totalInvestPerson}</label>
                        </span>
                    </div>
                    <div className='box2'>
                        <span className='gray'>理财期限</span>
                        <span>{this.props.data.investPeriod}</span>
                        <span className='gray'>
                            <label>项目总额：</label>
                            <label className='black'>{this.props.data.productPrincipal}</label>
                        </span>
                    </div>
                    <div className='box3'>
                    <Progress data={this.getProgressData()}/>
                    </div>
                </div>
                <div className='bottom box-sizing'>
                    <label className='gray'>起息日期：</label>
                    <label>{this.props.data.interestStartDate}</label>
                    <label onClick={this.showAgreementHandler.bind(this)}>投资协议》</label>
                </div>
            </div>
    }
}