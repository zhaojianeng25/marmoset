/**
* @Author: LinQiuWen
* @description:m职业师父对照表
*/
module game.data.template{
    export class SchoolMasterSkillInfoBaseVo{
       /*字段*/
       public id: number;
       public masterid: number; //师傅任务

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.masterid = data.getUint32();
       }
    }
}