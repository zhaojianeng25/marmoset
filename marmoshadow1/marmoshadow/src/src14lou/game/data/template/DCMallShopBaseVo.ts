/**
* @Author: LinQiuWen
* @description:D点卡服表格/DMT3点卡服道具商城售卖配置表
*/

module game.data.template{
    export class DCMallShopBaseVo{
       /*字段*/
       public id: number;  //商品ID
       public order: number;   //排序
       public type: number;    //商品分类
       public totalrecharge: number;    //VIP等级要求
       public des: string; //商品描述
       public cuxiaotype: number;  //促销类型

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.order = data.getUint32();
           this.type = data.getUint32();
           this.totalrecharge = data.getUint32();
           this.des = data.getUTFBytes(data.getUint32());
           this.cuxiaotype = data.getUint32();
       }
    }
}