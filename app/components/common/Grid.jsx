import React from 'react';
import loading_gif from '../../images/loading.gif';


require("../../scss/common/components/Grid.scss");

export default class Grid extends React.Component {

    constructor(props){
        super(props);
        this.store = props.store;
        this.showThead = props.showThead || false;  //是否显示table thead，默认不显示
        this.layout = props.layout;
        this.OuterGridItem = props.OuterGridItem;
        this._ajaxLoaded = false; //false代表未执行ajax请求数据
        this.state = { data: this.store.getDataStructure() };//初次加载，渲染为空
        this.initData();
    }

    initData(){
        this.store.deferred.done( (d) => {
            this.store.setData(d);
            this._ajaxLoaded = true;
            this.setState({data: this.store.getData()});
        });
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
                        this.state.data.items.map( (itemData,key) => <OuterGridItem key={key} itemData={itemData} ></OuterGridItem>)
                    }
                    <div className="loading"><img src={loading_gif}/></div>
                </div>
            }

            //使用默认组件
            return <DefaultTableGrid data={this.state.data} layout={this.layout} showThead={this.showThead}/>
        }
        else{
            if(this._ajaxLoaded) return <div className="grid noData">暂无数据</div>;
            else return <div className="grid"></div>
        }

    }

    componentDidMount(){
        this._scrollHandler = ()=>{
            var scrollHeight = document.documentElement.scrollHeight;
            var clientHeight= document.documentElement.clientHeight;
            var scrollTop = document.body.scrollTop;
            var scrollHeight2= document.body.scrollTop+clientHeight;
            var delayTime = 1500; //毫秒
            if(scrollTop > 0 && scrollHeight2==scrollHeight) {
                //滚动到底部移除scroll事件
                window.removeEventListener("scroll", this._scrollHandler, false);
                //显示加载数据gif图片
                var loading = document.querySelector(".loading");
                loading.style.display = "block";
                //滚动条滚到底部
                document.body.scrollTop = scrollTop+loading.clientHeight;

                if(this.state.data.totalPage <= 1 && this.state.data.pageNo >= this.state.data.totalPage){
                    var t = window.setTimeout(()=>{
                        loading.innerHTML = "已加载全部！";
                        clearTimeout(t);
                    },delayTime);
                    return;
                }

                this.store.request({
                    pageNo:this.state.data.pageNo+1,
                    pageSize:this.state.data.pageSize
                }).done( (d) => {
                    this.store.setData(d);
                    //2秒后更新component
                    var t= window.setTimeout(()=>{
                        loading.style.display = "none";
                        //数据加载完毕继续监听scroll事件
                        this.setState({data: this.store.getData()});
                        window.addEventListener('scroll',this._scrollHandler, false);
                        clearTimeout(t);
                    },delayTime);
                });
            }
        };
        window.addEventListener('scroll',this._scrollHandler, false);
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this._scrollHandler, false);
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
        this.showThead = props.showThead;
    }

    render() {
        var  items = this.data.items;
        return <div className="grid">
                <table className="grid-table">
                    <thead style={{display: this.showThead?"block":"none"}} >
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
    OuterGridItem: React.PropTypes.func,
    layout: React.PropTypes.array,
    showThead: React.PropTypes.bool
};

DefaultTableGrid.propTypes = {
    data: React.PropTypes.object.isRequired,
    layout: React.PropTypes.array.isRequired,
    showThead: React.PropTypes.bool
};