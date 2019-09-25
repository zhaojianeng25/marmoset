/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-任性一下花费
*/
module game.data.template{
    export class CRenXingCircTaskCostBaseVo{
       /*字段*/
       public id: number;  //任性次数
       public xiayicost: number;   //花费符石
       public stonecost: number;   //花费声望
 
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.stonecost = data.getUint32();
           this.xiayicost = data.getUint32();
   
       }
    }
}