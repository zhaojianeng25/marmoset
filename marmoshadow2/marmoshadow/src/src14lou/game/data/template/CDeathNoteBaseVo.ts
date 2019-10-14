/**
* @Author: LinQiuWen
* @description:s死亡提醒表
*/
module game.data.template{
    export class CDeathNoteBaseVo{
       /*字段*/
       public id : number;
       public level: number;   //等级
       public icon: string;    //图标icon
       public eventId: number; //跳转编号
       public text: string;    //描述
       public functionId: number;  //功能开启序号

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.level = data.getUint32();
           this.icon = data.getUTFBytes(data.getUint32());
           this.eventId = data.getUint32();
           this.text = data.getUTFBytes(data.getUint32());
           this.functionId = data.getUint32();
       }
    }
}