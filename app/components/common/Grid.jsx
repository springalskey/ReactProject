import React from 'react';
import loading_gif from '../../images/loading.gif';


require("../../scss/common/components/Grid.scss");

export default class Grid extends React.Component {

    constructor(props){
        super(props);
        this.store = props.store;
        this.thead = props.thead || false;
        this.layout = props.layout;
        this.data = this.store.getData();
        this.OuterGridItem = props.OuterGridItem;
        this.state = {request: false};
    }

    render() {
        var OuterGridItem = this.OuterGridItem;
        var hasData = false; //是否有数据
        if(this.store.hasData()){
            hasData = true;
        }
        if(hasData){

            //外部传入组件
            if(OuterGridItem){
                return <div className="grid">
                {
                    this.data.items.map( (itemData,key) => <OuterGridItem key={key} itemData={itemData} ></OuterGridItem>)
                    }
                    <div className="loading"><img src={loading_gif}/></div>
                </div>
            }

            //使用默认组件
            return <DefaultTableGrid data={this.data} layout={this.layout} thead={this.thead}/>
        }
        else{
            return <div className="grid noData">暂无数据</div>
        }

    }

    componentDidMount(){
        var scroll = ()=>{
            var scrollHeight = document.documentElement.scrollHeight;
            var clientHeight= document.documentElement.clientHeight;
            var scrollTop= document.body.scrollTop+clientHeight;
            var  delayTime = 1500; //毫秒

            if(scrollTop==scrollHeight) {
                window.removeEventListener("scroll", scroll, false);
                //显示加载数据gif图片
                var loading = document.querySelector(".loading");
                loading.style.display = "block";
                //滚动条滚到底部
                document.body.scrollTop = document.body.scrollTop+loading.clientHeight;

                if(this.data.totalPage == 1 && this.data.pageNo >= this.data.totalPage){
                    window.setTimeout(()=>{
                        loading.innerHTML = "已加载全部！";
                    },delayTime);
                    return;
                }
                this.store.request();
                //2秒后更新component
                window.setTimeout(()=>{
                    this.setState({request: true});
                    loading.style.display = "none";
                    window.addEventListener('scroll',scroll, false);
                },delayTime);
            }
        };
        window.addEventListener('scroll',scroll, false);

    }
}


//filed与name字段是必须，其他可选
//var layout = [
//    {filed:"id",name:"编号",style:{height:"1rem"}},
//    {filed:"productName",name:"产品",style:{}},
//    {filed:"orderId",name:"订单号",style:{}},
//    {filed:"interest",name:"收益",style:{},formatter:function(value){
//        return value+".00";
//    }}
//];

export class DefaultTableGrid extends React.Component {

    constructor(props){
        super(props);
        this.layout = props.layout;
        this.data = props.data;
        this.thead = props.thead;
    }

    render() {
        var  items = this.data.items;
        return <div className="grid">
                <table className="grid-table">
                    <thead style={{display: this.thead?"block":"none"}} >
                        <tr>
                        { this.layout.map((item,key) => <th key={key}>{item.name}</th>) }
                        </tr>
                    </thead>
                    <tbody>
                {
                    items.map((itemData,key)=> {
                        var jsx = [];
                        for(var i=0; i<this.layout.length; i++){
                            var style = this.layout[i].style;
                            var formatter = this.layout[i].formatter;
                            var value = itemData[this.layout[i].filed];
                            if(formatter){
                                value = formatter(value);
                            }
                            jsx.push(<td key={i} style={style} >{value}</td>);
                        }
                        return <tr key={key} className="grid-table-row">{jsx}</tr>

                    })}

                    </tbody>
                </table>
            <div className="loading" ><img src={loading_gif}/></div>
        </div>
    }
}


Grid.propTypes = {
    store: React.PropTypes.object.isRequired,
    //layout与OuterGridItem二选一
    layout: React.PropTypes.array,
    OuterGridItem: React.PropTypes.func
};

DefaultTableGrid.propTypes = {
    data: React.PropTypes.object.isRequired,
    layout: React.PropTypes.array.isRequired
};