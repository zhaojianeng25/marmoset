/**
* @Author: LinQiuWen
* @description:s商店商城商会表/bMT3商城分页名称表
*D点卡服表格/DMT3点卡服商城分页名称表
*/
module game.data.template{
    export class CMallShopTabNameBaseVo{
       /*字段*/
       public id: number;  
       public tabname: string;

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.tabname = data.getUTFBytes(data.getUint32());
       }
    }
}