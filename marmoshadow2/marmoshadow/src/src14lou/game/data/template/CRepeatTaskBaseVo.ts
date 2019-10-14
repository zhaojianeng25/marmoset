/**
* @Author: LinQiuWen
* @description:循环任务/x循环任务配置表
*/
module game.data.template{
    export class CRepeatTaskBaseVo{
       /*字段*/
       public id: number;  //
       public eactivetype: number; //活动类型
       public etasktype: number;   //任务类型
       public ngroupid: number;    //类型下组id
       public strtypename: string; //任务栏任务名称
       public strtaskname: string; //任务名称
       public strtasktitle: string;    //追踪显示任务名
       public strtaskdes: string;  //追踪描述
       public strtasktitletrack: string;   //寻路跳转
       public strtaskdestrack: string; //追踪描述
       public nflytype: number;    //寻路跳转
       public nautodone: number;   //是否自动完成
       public nacceptchatid: number;   //接任务对话
       public nnpcchatid: number;  //目标NPC对话
       public ncommitchatid: number;   //交任务对话
       public nacceptnpcid: number;    //接任务npcid
       public ntwodone: number;    //是否支持双人任务

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.eactivetype = data.getUint32();
           this.etasktype = data.getUint32();
           this.ngroupid = data.getUint32();
           this.strtypename = data.getUTFBytes(data.getUint32());
           this.strtaskname = data.getUTFBytes(data.getUint32());
           this.strtasktitle = data.getUTFBytes(data.getUint32());
           this.strtaskdes = data.getUTFBytes(data.getUint32());
           this.strtasktitletrack = data.getUTFBytes(data.getUint32());
           this.strtaskdestrack = data.getUTFBytes(data.getUint32());
           this.nflytype = data.getUint32();
           this.nautodone = data.getUint32();
           this.nacceptchatid = data.getUint32();
           this.nnpcchatid = data.getUint32();
           this.ncommitchatid = data.getUint32();
           this.nacceptnpcid = data.getUint32();
           this.ntwodone = data.getUint32();

       }
    }
}