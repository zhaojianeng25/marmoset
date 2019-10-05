/**
* @Author: LinQiuWen
* @description:CFubenTaskBaseVo.ts
*/
module game.data.template{
    export class CFubenTaskBaseVo{
       /*字段*/
       public id: number;  //
       public nfubentasktype: number;  //任务类型
       public taskpanelefttitle: string;   //任务栏任务名称
       public taskpanetitle: string;   //任务名称
       public taskpanedis: string; //任务目的
       public taskpanedes: string; //任务描述
       public tracetitle: string;  //追踪显示任务名
       public tracedes: string;    //追踪描述
 
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.nfubentasktype = data.getUint32();
           this.taskpanelefttitle = data.getUTFBytes(data.getUint32());
           this.taskpanetitle = data.getUTFBytes(data.getUint32());
           this.taskpanedis = data.getUTFBytes(data.getUint32());
           this.taskpanedes = data.getUTFBytes(data.getUint32());
           this.tracetitle = data.getUTFBytes(data.getUint32());
           this.tracedes = data.getUTFBytes(data.getUint32());

       }
    }
}