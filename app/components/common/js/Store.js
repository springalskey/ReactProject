/**
 * Created by yanfl on 2016/1/13.
 */


export default class Store {

    constructor(options){
        this._url = options.url;
        this._data= this.getDataStructure();
        if(this._url) this.deferred = this._ajax();
    }

    _ajax(param){
        param = param || {};
        return $.ajax({
            url: this._url,
            data:{pageNo:param.pageNo,pageSize:param.pageSize},
            dataType: "json",
            type: "get",
            async: true,
            cache: false
        });
    }

    request(param){
        return this._ajax(param);
    }

    getData(){
        return this._data;
    }

    hasData(){
        if( this._data &&
            this._data.totalPage > 0 &&
            this._data.items &&
            this._data.items.length > 0
        )   return true;
        return false;
    }

    getDataStructure(){
        return {
            pageNo: 0,
            pageSize: 0,
            totalPage:0,
            totalNum: 0,
            items: []
        }
    }

    setData(data){
        this._data.pageNo = data.pageNo;
        this._data.pageSize = data.pageSize;
        this._data.totalPage = data.totalPage;
        this._data.totalNum = data.totalNum;
        this._data.items = this._data.items.concat(data.items);
    }
}