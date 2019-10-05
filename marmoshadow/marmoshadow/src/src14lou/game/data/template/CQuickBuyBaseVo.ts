/**
* @Author: LinQiuWen
* @description:k快捷购买道具表
* D点卡服表格/DMT3快捷购买道具表
*/
module game.data.template{
    export class CQuickBuyBaseVo{
       /*字段*/
       public id: number;  //道具id
       public buytype: number; //购买类型
       public goodsid: number; //对应值
 
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.buytype = data.getUint32();
           this.goodsid = data.getUint32();
       }
    }
}