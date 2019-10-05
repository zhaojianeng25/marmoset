/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CshouchonglibaoBaseVo{
       /*字段*/
       public id: number;
       public itemid: Array<number> = [];  //物品id1,物品id2,物品id3,物品id4,物品id5,物品id6
       public itemnum: Array<number> = []; //物品数量1,物品数量2,物品数量3,物品数量4,物品数量5,物品数量6
       public petid: Array<number> = [];   //宠物id1,宠物id2,宠物id3,宠物id4,宠物id5,宠物id6
       public petnum: Array<number> = []; //宠物数量1,宠物数量2,宠物数量3,宠物数量4,宠物数量5,宠物数量6
       public borderpic: Array<string> = [];   //标签1,标签2,标签3,标签4,标签5,标签6

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.itemid.push(data.getUint32());
           }
            length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.itemnum.push(data.getUint32());
           }
           length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.petid.push(data.getUint32());
           }
           length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.petnum.push(data.getUint32());
           }
           length = data.getUint32();
            for (var index = 0; index < length;index++) {
                this.borderpic.push(data.getUTFBytes(data.getUint32()));
            }           
       }
    }
}