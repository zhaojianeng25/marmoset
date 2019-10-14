/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class DCGoodsBaseVo{
       /*字段*/
       public id: number;  //商品ID
       public name: string;    //商品名备注
       public type: number;    //商品类型
       public itemId: number;  //类型对应
       public currencys: Array<number> = [];    //货币1,货币2
       public oldprices: Array<number> = [];    //价格1,价格2
       public prices: Array<number> = [];   //现价1,现价2
       public limitType: number;   //限购类型
       public limitNum: number;    //限购数量
       public limitSaleNum: number;    //限售数量
       public limitLookLv: number; //可见等级
       public lvMin: number;   //可购买等级下限
       public lvMax: number;   //可购买等级上限
       public floatingprice: number;   //价格上涨浮动
       public des: string; //商品描述

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           this.type = data.getUint32();
           this.itemId = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.currencys.push(data.getUint32());
           }
            length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.oldprices.push(data.getUint32());
           }
           length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.prices.push(data.getUint32());
           }
           this.limitType = data.getUint32();
           this.limitNum = data.getUint32();
           this.limitSaleNum = data.getUint32();
           this.limitLookLv = data.getUint32();
           this.lvMin = data.getUint32();
           this.lvMax = data.getUint32();
           this.floatingprice = data.getFloat64();
           this.des = data.getUTFBytes(data.getUint32());
       }
    }
}