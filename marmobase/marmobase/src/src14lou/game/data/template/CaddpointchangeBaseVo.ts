/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CaddpointchangeBaseVo{
       /*字段*/
       public id: number;
       public consume: number; //消耗

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.consume = data.getUint32();
       }
    }
}