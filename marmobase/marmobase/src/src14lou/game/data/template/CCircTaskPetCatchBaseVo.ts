/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-寻找宠物类分表
*/
module game.data.template{
    export class CCircTaskPetCatchBaseVo{
       /*字段*/
       public id: number;  //寻找宠物类id
       public ctgroup: number; //寻找宠物组
       public school: number;  //职业
       public levelmin: number;    //等级段min
       public levelmax: number;    //等级段max
       public recycleitem: string; //回收宠物
       public itemnum: number; //物品数量
       public shopnpc: number; //售卖NPC

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.ctgroup = data.getUint32();
           this.school = data.getUint32();
           this.levelmin = data.getUint32();
           this.levelmax = data.getUint32();
           this.recycleitem = data.getUTFBytes(data.getUint32());
           this.itemnum = data.getUint32();
           this.shopnpc = data.getUint32();
       }
    }
}