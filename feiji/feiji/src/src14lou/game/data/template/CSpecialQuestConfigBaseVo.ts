/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CSpecialQuestConfigBaseVo{
       /*字段*/
       public id: number;  //id
       public questname: string;   //任务面板名称
       public name: string;    //任务名称
       public aim: string; //任务目标
       public discribe: string;    //任务描述
       public tracname: string;    //追踪显示任务名
       public tracdiscribe: string;    //追踪描述
       public tasknumber: number;  //任务编号

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.questname = data.getUTFBytes(data.getUint32());
           this.name = data.getUTFBytes(data.getUint32());
           this.aim = data.getUTFBytes(data.getUint32());
           this.discribe = data.getUTFBytes(data.getUint32());
           this.tracname = data.getUTFBytes(data.getUint32());
           this.tracdiscribe = data.getUTFBytes(data.getUint32());
           this.tasknumber = data.getUint32();
       }
    }
}