/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class AddPointResetItemConfigBaseVo{
       /*字段*/
       public id: number;
       public type: number; //类型
       public tizhi: number;   //体质
       public moli: number;    //魔力 
       public liliang: number; // 力量
       public naili: number;   //耐力
       public minjie: number;   //敏捷

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getInt32();
           this.type = data.getInt32();
           this.tizhi = data.getInt32();
           this.moli = data.getInt32();
           this.liliang = data.getInt32();
           this.naili = data.getInt32();
           this.minjie = data.getInt32();
       }
    }
}