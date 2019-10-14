/**
* @Author: LinQiuWen
* @description:f福利奖励/签到奖励
*/
module game.data.template{
    export class CqiandaojiangliBaseVo{
       /*字段*/
       public id: number;
       public itemId: number;  //道具id
       public itemNum: number; //道具数量
       public mtype: number;   //货币类型
       public money: number;   //货币数量
       public borderpic: string;   //角标

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.itemId = data.getUint32();
           this.itemNum = data.getUint32();
           this.mtype = data.getUint32();
           this.money = data.getUint32();
           this.borderpic = data.getUTFBytes(data.getUint32());
       }
    }
}