/**
* @Author: LinQiuWen
* @description:
*/

module game.data.template{
    export class EquipEffectConfigBaseVo{
       /*字段*/
       public id: number;
       public equipNum: number;    //穿戴装备数量
       public quality: number;     //品质
       public effectId: number;    //特效

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.equipNum = data.getUint32();
           this.quality = data.getUint32();
           this.effectId = data.getUint32();
       }
    }
}