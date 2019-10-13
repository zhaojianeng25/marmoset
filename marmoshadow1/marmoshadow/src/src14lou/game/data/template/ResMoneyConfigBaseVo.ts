/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class ResMoneyConfigBaseVo{
       /*字段*/
       public id: number; //等级
       public resmoney: number;    //金钱上限
       public nextexp: number;     //升级经验
       public petfightnum: number; //宠物出战上限
       public addpointschemenum: number;   //加点方案数量
       public shengwangmax: number;    //援助声望上限

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.resmoney = data.getUint32();
           this.nextexp = data.getUint32();
           data.getUint32();
           //this.nextexp = data.getFloat64();       
           this.petfightnum = data.getUint32();
           this.addpointschemenum = data.getUint32();
           this.shengwangmax = data.getUint32();
       }
    }
}