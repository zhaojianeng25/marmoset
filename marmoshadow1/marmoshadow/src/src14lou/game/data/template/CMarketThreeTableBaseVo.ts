/**
* @Author: LinQiuWen
* @description:s商店商城商会表/bMT3摆摊三级表
* D点卡服表格/DMT3点卡服摆摊三级表
*/
module game.data.template{
    export class CMarketThreeTableBaseVo{
       /*字段*/
       public id: number;  //序号
       public itemid: number;  //id
       public itemtype: number;    //物品类型
       public logictype: number;   //逻辑类型
       public israrity: number;    //珍品
       public firstno: number; //1级菜单ID
       public twono: number;   //2级菜单ID
       public limitlooklv: number; //可见等级
       public buylvmin: number;    //可购买等级下限
       public buylvmax: number;    //可购买等级上限
       public value: number;   //值1
       public name: string;    //显示1
       public valuerange: Array<number> = [];  //区间1,区间2,区间3,区间4,区间5,区间6,区间7,区间8,区间9,区间10,区间11,区间12
       public cansale: number; //是否可以摆摊上架

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.itemid = data.getUint32();
           this.itemtype = data.getUint32();
           this.logictype = data.getUint32();
           this.israrity = data.getUint32();
           this.firstno = data.getUint32();
           this.twono = data.getUint32();
           this.limitlooklv = data.getUint32();
           this.buylvmin = data.getUint32();
           this.buylvmax = data.getUint32();
           this.value = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.valuerange.push(data.getUint32());
           }
        //    this.valuerange
           this.cansale = data.getUint32();
       }
    }
}