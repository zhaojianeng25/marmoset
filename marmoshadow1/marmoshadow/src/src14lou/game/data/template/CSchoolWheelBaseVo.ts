/**
* @Author: LinQiuWen
* @description:z职业转盘表
*/

module game.data.template{
    export class CSchoolWheelBaseVo{
        /*字段*/
       public id : number;
       public items: Array<string> = [];    //物品1,物品2,物品3,物品4,物品5,物品6,物品7,物品8,物品9,物品10,物品11,物品12,物品13,物品14
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.items.push(data.getUTFBytes(data.getUint32()));
           }
       }
    }
}