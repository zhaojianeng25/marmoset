/**
* @Author: LinQiuWen
* @description:
*/
module game.data.template{
    export class CloginawardBaseVo{
       /*字段*/
       public id: number;  //Cloginaward
       public dayimg: string;  //标题
       public item1id: Array<string> = [];  //角色ID1道具1,角色ID2道具1,角色ID3道具1,角色ID4道具1,角色ID5道具1,角色ID6道具1
       public item1num: Array<number> = []; //角色ID1数量1,角色ID2数量1,角色ID3数量1,角色ID4数量1,角色ID5数量1,角色ID6数量1
       public item1bind: Array<number> = [];    //角色ID1道具1是否绑定,角色ID2道具1是否绑定,角色ID3道具1是否绑定,角色ID4道具1是否绑定,角色ID5道具1是否绑定,角色ID6道具1是否绑定
       public item2id: Array<string> = [];  //角色ID1道具2,角色ID2道具2,角色ID3道具2,角色ID4道具2,角色ID5道具2,角色ID6道具2
       public item2num: Array<number> = []; //角色ID1数量2,角色ID2数量2,角色ID3数量2,角色ID4数量2,角色ID5数量2,角色ID6数量2
       public item2bind: Array<number> = [];    //角色ID1道具2是否绑定,角色ID2道具2是否绑定,角色ID3道具2是否绑定,角色ID4道具2是否绑定,角色ID5道具2是否绑定,角色ID6道具2是否绑定
       public item3id:  Array<string> = []; //角色ID1道具3,角色ID2道具3,角色ID3道具3,角色ID4道具3,角色ID5道具3,角色ID6道具3
       public item3num: Array<number> = []; //角色ID1数量3,角色ID2数量3,角色ID3数量3,角色ID4数量3,角色ID5数量3,角色ID6数量3
       public item3bind: Array<number> = [];    //角色ID1道具3是否绑定,角色ID2道具3是否绑定,角色ID3道具3是否绑定,角色ID4道具3是否绑定,角色ID5道具3是否绑定,角色ID6道具3是否绑定
       public needcapacity: Array<number> = []; //角色ID1物品需要包裹格,角色ID2物品需要包裹格,角色ID3物品需要包裹格,角色ID4物品需要包裹格,角色ID5物品需要包裹格,角色ID6物品需要包裹格
       public pet1id: Array<number> = [];   //角色ID1宠物1,角色ID2宠物1,角色ID3宠物1,角色ID4宠物1,角色ID5宠物1,角色ID6宠物1
       public pet1bind: Array<number> = []; //角色ID1宠物1是否绑定,角色ID2宠物1是否绑定,角色ID3宠物1是否绑定,角色ID4宠物1是否绑定,角色ID5宠物1是否绑定,角色ID6宠物1是否绑定
       public pet2id:  Array<number> = [];  //角色ID1宠物2,角色ID2宠物2,角色ID3宠物2,角色ID4宠物2,角色ID5宠物2,角色ID6宠物2
       public pet2bind: Array<number> = []; //角色ID1宠物2是否绑定,角色ID2宠物2是否绑定,角色ID3宠物2是否绑定,角色ID4宠物2是否绑定,角色ID5宠物2是否绑定,角色ID6宠物2是否绑定
       public pet3id: Array<number> = [];   //角色ID1宠物3,角色ID2宠物3,角色ID3宠物3,角色ID4宠物3,角色ID5宠物3,角色ID6宠物3
       public pet3bind: Array<number> = []; //角色ID1宠物3是否绑定,角色ID2宠物3是否绑定,角色ID3宠物3是否绑定,角色ID4宠物3是否绑定,角色ID5宠物3是否绑定,角色ID6宠物3是否绑定
       public needpetcapacity: Array<number> = []; //角色ID1宠物需要包裹格,角色ID2宠物需要包裹格,角色ID3宠物需要包裹格,角色ID4宠物需要包裹格,角色ID5宠物需要包裹格,角色ID6宠物需要包裹格
 
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.dayimg = data.getUTFBytes(data.getUint32());
           let item1idLength = data.getUint32();
           for (var index = 0; index < item1idLength;index++) {
               this.item1id.push(data.getUTFBytes(data.getUint32()));
           }
           let item1numLength = data.getUint32();
           for (var index = 0; index < item1numLength;index++) {
               this.item1num.push(data.getUint32());
           }
           let item1bindLength = data.getUint32();
           for (var index = 0; index < item1bindLength;index++) {
               this.item1bind.push(data.getUint32());
           }
           let item2idLength = data.getUint32();
           for (var index = 0; index < item2idLength;index++) {
               this.item2id.push(data.getUTFBytes(data.getUint32()));
           }
           let item2numLength = data.getUint32();
           for (var index = 0; index < item2numLength;index++) {
               this.item2num.push(data.getUint32());
           }
           let item2bindLength = data.getUint32();
           for (var index = 0; index < item2bindLength;index++) {
               this.item2bind.push(data.getUint32());
           }
           let item3idLength = data.getUint32();
           for (var index = 0; index < item3idLength;index++) {
               this.item3id.push(data.getUTFBytes(data.getUint32()));
           }
           let item3numLength = data.getUint32();
           for (var index = 0; index < item3numLength;index++) {
               this.item3num.push(data.getUint32());
           }
           let item3bindLength = data.getUint32();
           for (var index = 0; index < item3bindLength;index++) {
               this.item3bind.push(data.getUint32());
           }
           let needcapacityLength = data.getUint32();
           for (var index = 0; index < needcapacityLength;index++) {
               this.needcapacity.push(data.getUint32());
           }
           let pet1idLength = data.getUint32();
           for (var index = 0; index < pet1idLength;index++) {
               this.pet1id.push(data.getUint32());
           }
           let pet1bindLength = data.getUint32();
           for (var index = 0; index < pet1bindLength;index++) {
               this.pet1bind.push(data.getUint32());
           }
           let pet2idLength = data.getUint32();
           for (var index = 0; index < pet2idLength;index++) {
               this.pet2id.push(data.getUint32());
           }
           let pet2bindLength = data.getUint32();
           for (var index = 0; index < pet2bindLength;index++) {
               this.pet2bind.push(data.getUint32());
           }
           let pet3idLength = data.getUint32();
           for (var index = 0; index < pet3idLength;index++) {
               this.pet3id.push(data.getUint32());
           }
           let pet3bindLength = data.getUint32();
           for (var index = 0; index < pet3bindLength;index++) {
               this.pet3bind.push(data.getUint32());
           }
           let needpetcapacityLength = data.getUint32();
           for (var index = 0; index < needpetcapacityLength;index++) {
               this.needpetcapacity.push(data.getUint32());
           }
       }
    }
}