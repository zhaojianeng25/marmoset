/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-寻找物品类分表
*/
module game.data.template{
    export class CCircTaskItemFindBaseVo{
       /*字段*/
       public id: number;  //寻找物品类id
       public ctgroup: number; //寻找物品组
       public school: number;  //职业
       public levelmin: number;    //等级段min
       public levelmax: number;    //等级段max
       public recycleitem: string; //回收物品
       public itemnum: number; //物品数量
       public islegend: number;    //是否可传说
       public legendtime: number;  //传说时间限制
       public nneedquality: number;    //是否需求品质
       public nqualitya: number;   //品质系数
       public nqualityb: number;   //品质常数

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
           this.islegend = data.getUint32();
           this.legendtime = data.getUint32();
           this.nneedquality = data.getUint32();
           this.nqualitya = data.getUint32();
           this.nqualityb = data.getUint32();
       }
    }
}