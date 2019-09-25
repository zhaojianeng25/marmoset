/**
* @Author: LinQiuWen
* @description:s商店商城商会表/bMT3摆摊二级表
* description: D点卡服表格/DMT3点卡服摆摊二级表
*/
module game.data.template{
    export class CMarketSecondTableBaseVo{
       /*字段*/
       public id: number;  //一级菜单ID
       public name: string;    //名字
       public iconid: number;   //图标
       public groupNum:number;   //筛选组
       public thirdmenus: Array<number> = []; //二级菜单1,二级菜单2,二级菜单3,二级菜单4,二级菜单5,二级菜单6,二级菜单7,二级菜单8,二级菜单9,二级菜单10,二级菜单11,二级菜单12,二级菜单13,二级菜单14,二级菜单15,二级菜单16,二级菜单17,二级菜单18,二级菜单19,二级菜单20,二级菜单21,二级菜单22,二级菜单23,二级菜单24,二级菜单25,二级菜单26,二级菜单27,二级菜单28,二级菜单29,二级菜单30,二级菜单31,二级菜单32,二级菜单33,二级菜单34,二级菜单35,二级菜单36,二级菜单37,二级菜单38,二级菜单39,二级菜单40,二级菜单41,二级菜单
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.name = data.getUTFBytes(data.getUint32());
           this.iconid = data.getUint32();
           this.groupNum = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.thirdmenus.push(data.getUint32());
           }
        
       }
    }
}