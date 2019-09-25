/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-收集物品类分表
*/
module game.data.template{
    export class CCircTaskItemCollectBaseVo{
       /*字段*/
       public id:number;   //收集物品类id
       public ctgroup:number;  //收集物品组
       public school:number;   //职业
       public levelmin:number; //等级段min
       public levelmax:number; //等级段max
       public mapid:string;    //地图id
       public monsterid: string;   //怪物id
       public itemid:number;   //物品id
       public itemnum:number;  //物品数量
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.ctgroup = data.getUint32();
           this.school = data.getUint32();
           this.levelmin = data.getUint32();
           this.levelmax = data.getUint32();
           this.mapid = data.getUTFBytes(data.getUint32());
           this.monsterid = data.getUTFBytes(data.getUint32());
           this.itemid = data.getUint32();
           this.itemnum = data.getUint32();
       }
    }
}