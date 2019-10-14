/**
* @Author: LinQiuWen
* @description:D点卡服表格/点卡服技能格消耗表
*/
module game.data.template{
    export class AcupointLevelUpPayBaseVo{
       /*字段*/
       public id: number;  //技能格ID
       public level: number;   //技能格等级
       public needExp: Array<number> = []; //第一重经验,第二重经验,第三重经验,第四重经验,第五重经验,第六重经验,第七重经验
       public needMoney: Array<number> = []; //第一重金钱,第二重金钱,第三重金钱,第四重金钱,第五重金钱,第六重金钱,第七重金钱
       public needQihai: Array<number> = [];   //第一重气海值,第二重气海值,第三重气海值,第四重气海值,第五重气海值,第六重气海值,第七重气海值
       public moneyCostRule: Array<number> = [];   //金钱消耗规则1,金钱消耗规则2,金钱消耗规则3
       public moneyCostRuleType: Array<number> = [];//金钱消耗类型1,金钱消耗类型2,金钱消耗类型3
 
       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.level = data.getUint32();
           let needExpLength = data.getUint32();
           for (var index = 0; index < needExpLength;index++) {
               this.needExp.push(data.getUint32());
           }
           let needMoneyLength = data.getUint32();
           for (var index = 0; index < needMoneyLength;index++) {
               this.needMoney.push(data.getUint32());
           }
           let needQihaiLength = data.getUint32();
           for (var index = 0; index < needQihaiLength;index++) {
               this.needQihai.push(data.getUint32());
           }
           let moneyCostRuleLength = data.getUint32();
           for (var index = 0; index < moneyCostRuleLength;index++) {
               this.moneyCostRule.push(data.getUint32());
           }
           let moneyCostRuleTypeLength = data.getUint32();
           for (var index = 0; index < moneyCostRuleTypeLength;index++) {
               this.moneyCostRuleType.push(data.getUint32());
           }
       }
    }
}