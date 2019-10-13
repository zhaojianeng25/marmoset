/**
* @Author: LinQiuWen
* @description:s商店商城商会表/cMT3宠物商店表
*/
module game.data.template{
    export class CPetShopBaseVo{
       /*字段*/
       public id: number;  //页签显示
       public limitLookLv: number; //可见页签等级
       public showLv: number;  //页签显示
       public goodsids: Array<number> = [];    //商品ID1,商品ID2,商品ID3

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.limitLookLv = data.getUint32();
           this.showLv = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.goodsids.push(data.getUint32());
           }

       }
    }
}