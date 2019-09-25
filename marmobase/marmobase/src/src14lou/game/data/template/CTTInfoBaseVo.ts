/**
* @Author: LinQiuWen
* @description:k跨服/K跨服天梯数据表
*/

module game.data.template{
    export class CTTInfoBaseVo{
       /*字段*/
       public id: number;  //dengji
       public ttname: string;  //段位图标
       public strimage: string;    //段位图标
       public strimagestar: string;    //星级图标
       public score: number;   //需要积分
       public bonusid: Array<number> = []; //道具奖励1,道具奖励2,道具奖励3,道具奖励4,道具奖励5
       public bounuscount: Array<number> = []; //道具奖励1数量,道具奖励2数量,道具奖励3数量,道具奖励4数量,道具奖励5数量
  
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.ttname = data.getUTFBytes(data.getUint32());
           this.strimage = data.getUTFBytes(data.getUint32());
           this.strimagestar = data.getUTFBytes(data.getUint32());
           this.score = data.getUint32();
           let length = data.getUint32();
           for (var index = 0; index < length;index++) {
               this.bonusid.push(data.getUint32());
           }
           length = data.getUint32();
            for (var index = 0; index < length;index++) {
               this.bounuscount.push(data.getUint32());
            }
       }
    }
}