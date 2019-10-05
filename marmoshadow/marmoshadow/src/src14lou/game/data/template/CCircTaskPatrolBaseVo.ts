/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-巡逻类分表
*/
module game.data.template{
    export class CCircTaskPatrolBaseVo{
       /*字段*/
       public id: number;  //巡逻类id
       public ctgroup: number; //巡逻组
       public schoolid: number;    //职业
       public levelmin: number;    //等级段min
       public levelmax: number;    //等级段max
       public mapid: string;   //地图id
  
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.ctgroup = data.getUint32();
           this.schoolid = data.getUint32();
           this.levelmin = data.getUint32();
           this.levelmax = data.getUint32();
           this.mapid = data.getUTFBytes(data.getUint32());
     
       }
    }
}