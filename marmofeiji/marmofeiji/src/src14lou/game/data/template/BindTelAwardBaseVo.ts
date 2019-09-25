/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class BindTelAwardBaseVo{
       /*字段*/
       public id: number;
       public itemid: Array<number> = [];   //角色1道具ID,角色2道具ID,角色3道具ID,角色4道具ID,角色5道具ID,角色6道具ID
       public itemnum: Array<number> = [];  //角色1道具数量,角色2道具数量,角色3道具数量,角色4道具数量,角色5道具数量,角色6道具数量

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           let itemidLength = data.getUint32();
           for (var index = 0; index < itemidLength;index++) {
               this.itemid.push(data.getUint32());
           }
           let itemnumLength = data.getUint32();
           for (var index = 0; index < itemnumLength;index++) {
               this.itemnum.push(data.getUint32());
           }
       }
    }
}