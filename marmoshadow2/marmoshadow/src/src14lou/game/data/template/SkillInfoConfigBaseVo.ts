/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class SkillInfoConfigBaseVo{
       /*字段*/
       public id: number;  //技能id
       public skillDisableDes: string; //未学会时描述
       public skillLevelRequireList: Array<number> = [];    //"技能等级1所需熟练度,技能等级2所需熟练度,技能等级3所需熟练度,技能等级4所需熟练度,技能等级5所需熟练度,技能等级6所需熟练度,技能等级7所需熟练度,技能等级8所需熟练度,技能等级9所需熟练度,技能等级10所需熟练度,技能等级11所需熟练度,技能等级12所需熟练度,技能等级13所需熟练度,技能等级14所需熟练度,技能等级15所需熟练度,技能等级16所需熟练度"
       public skillDesList: Array<string> = []; //技能等级1描述,技能等级2描述,技能等级3描述,技能等级4描述,技能等级5描述,技能等级6描述,技能等级7描述,技能等级8描述,技能等级9描述,技能等级10描述,技能等级11描述,技能等级12描述,技能等级13描述,技能等级14描述,技能等级15描述,技能等级16描述

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.skillDisableDes = data.getUTFBytes(data.getUint32());

           let skillLevelRequireListLength = data.getUint32();
           for (var index = 0; index < skillLevelRequireListLength;index++) {
               this.skillLevelRequireList.push(data.getUint32());
           }
           let skillDesListLength = data.getUint32();
           for (var index = 0; index < skillDesListLength;index++) {
               this.skillDesList.push(data.getUTFBytes(data.getUint32()));
           }
       }
    }
}