/**
* @Author: LinQiuWen
* @description:F服务器等级持续时间表
*/
module game.data.template{
    export class ServiceLevelConfigBaseVo{
       /*字段*/
       public id:number;
       public slevel: number;  //服务器等级
       public lastday: number; // 持续时间
       public openday: number; //服务器开放时间

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.slevel = data.getUint32();
           this.lastday = data.getUint32();
           this.openday = data.getUint32();
       }
    }
}