/**
 * Created by yanfl on 2016/1/13.
 */


export default class Store {

    constructor(options){
        this._url = options.url;
        this._data= null;
        this._ajax();
    }

    _ajax(param){
        param = param || {};
        $.ajax({
            url: this._url,
            data:{pageNo:param.pageNo,pageSize:param.pageSize},
            dataType: "json",
            type: "get",
            async: false,
            cache: false,
            success: (data) =>{
                if(this.hasData()){
                    this.mixinData(data);
                }
                else{
                    this.setData(data);
                }
            }
        });
    }

    request(param){
        this._ajax(param);
    }

    setData(data){
        this._data=  data;
    }

    getData(){
        return this._data;
    }

    hasData(){
        if( this._data &&
            this._data.items &&
            this._data.items.length >0
        )   return true;
        return false;
    }

    mixinData(data){
        this._data.pageNo = data.pageNo;
        this._data.pageSize = data.pageSize;
        this._data.totalPage = data.totalPage;
        this._data.totalNum = data.totalNum;
        this._data.items = this._data.items.concat(data.items);
    }

    addItem(item){

    }

    removeItem(id){

    }

    filterItem(){

    }

}