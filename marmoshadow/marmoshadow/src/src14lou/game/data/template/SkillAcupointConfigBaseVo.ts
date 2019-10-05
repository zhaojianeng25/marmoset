/**
* @Author: LinQiuWen
* @description:j技能格系统/技能熟练配置表
*/
module game.data.template{
    export class SkillAcupointConfigBaseVo{
       /*字段*/
       public id: number;  //技能ID
       public initValue: number;   //初始熟练度
       public acupointIDList: Array<number> = [];  //"影响技能格1ID,影响技能格2ID,影响技能格3ID,影响技能格4ID,影响技能格5ID,影响技能格6ID,影响技能格7ID,影响技能格8ID,影响技能格9ID,影响技能格10ID,影响技能格11ID,影响技能格12ID,影响技能格13ID,影响技能格14ID,影响技能格15ID,影响技能格16ID,影响技能格17ID,影响技能格18ID,影响技能格19ID,影响技能格20ID,影响技能格21ID"
       // double类型数组
       public acupointParaList: Array<number> = [];    //影响技能格1权值,影响技能格2权值,影响技能格3权值,影响技能格4权值,影响技能格5权值,影响技能格6权值,影响技能格7权值,影响技能格8权值,影响技能格9权值,影响技能格10权值,影响技能格11权值,影响技能格12权值,影响技能格13权值,影响技能格14权值,影响技能格15权值,影响技能格16权值,影响技能格17权值,影响技能格18权值,影响技能格19权值,影响技能格20权值,影响技能格21权值
 
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.initValue = data.getUint32();

           let acupointIDListLength = data.getUint32() ;
           for (var index = 0; index < acupointIDListLength;index++) {
               this.acupointIDList.push(data.getUint32());
           }

           let acupointParaListLength1 = data.getUint32();
           for (var index = 0; index < acupointParaListLength1;index++) {
               this.acupointParaList.push(data.getFloat64());
           }
       }
    }
}