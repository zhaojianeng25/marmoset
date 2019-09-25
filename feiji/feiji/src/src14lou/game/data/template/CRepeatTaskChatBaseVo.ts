/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务对话配置
*/
module game.data.template{
    export class CRepeatTaskChatBaseVo{
       /*字段*/
       public id: number;  //id
       public strmsg: string;  //任务对话

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.strmsg = data.getUTFBytes(data.getUint32());
       }
    }
}