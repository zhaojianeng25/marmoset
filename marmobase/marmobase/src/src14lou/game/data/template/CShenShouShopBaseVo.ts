/**
* @Author: LinQiuWen
* @description:s商店商城商会表/cMT3神兽商店表
*/
module game.data.template{
    export class CShenShouShopBaseVo{
       /*字段*/
       public id: number;  //序列
       public shopid: number;  //商店ID
       public visiblelevel: number;    //可见页签等级
       public name: string;    //页签显示
       public npcid: number;   //NPCid
       public goodsids: Array<number> = []; //商品ID1,商品ID2,商品ID3,商品ID4,商品ID5,商品ID6,商品ID7,商品ID8,商品ID9,商品ID10

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.shopid = data.getUint32();
           this.visiblelevel = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           this.npcid = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.goodsids.push(data.getUint32());
           }
       }
    }
}