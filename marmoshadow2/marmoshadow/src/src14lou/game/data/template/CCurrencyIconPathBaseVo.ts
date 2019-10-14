/**
* @Author: LinQiuWen
* @description:
*/

module game.data.template{
    export class CCurrencyIconPathBaseVo{
       /*字段*/
       public id: number;  //序列ID
       public name: string;    //备注
       public iconpath: string;    //图标
       public explain: string; //货币来源说明

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           this.iconpath = data.getUTFBytes(data.getUint32());
           this.explain = data.getUTFBytes(data.getUint32());

       }
    }
}