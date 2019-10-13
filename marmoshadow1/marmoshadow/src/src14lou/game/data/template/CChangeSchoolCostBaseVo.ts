/**
* @Author: LinQiuWen
* @description:z转职费用配置
*/

module game.data.template{
    export  class  CChangeSchoolCostBaseVo{
       /*字段*/
       public id: number;  //
       public originalcost: number;    //原价（符石）
       public currentprice: number;    //现价（符石）
       public discounticon: string;    //折扣率图标
       public discountrate: number;    //折扣率（策划用）
 
       constructor(){
       }

       public parse(data:Byte){
           this.id = data.getUint32();
        this.originalcost = data.getUint32();
        this.currentprice = data.getUint32();
        this.discounticon = data.getUTFBytes(data.getUint32());
        this.discountrate = data.getUint32();
       }
    }
}