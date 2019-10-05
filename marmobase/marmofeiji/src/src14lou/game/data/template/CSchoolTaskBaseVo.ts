/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务总表
*/
module game.data.template{
    export class CSchoolTaskBaseVo{
       /*字段*/
       public id: number;  //循环任务总表id
       public type: number;    //循环任务类型
       public levelgroup: number;  //等级组
       public levelmin: number;    //等级段min
       public levelmax: number;    //等级段max
       public maxnum: number;  //环数
       public exp_round_level_coef;    //经验环数等级系数
       public exp_round_final; //经验环数系数
       public exp_level_coef;  //经验等级系数
       public exp_final;   //经验常数
       public money_round_level_coef;  //金钱环数等级系数
       public money_round_coef;    //金钱环数系数
       public money_level_coef;    //金钱等级系数
       public money_round_final;   //金钱常数
       public s_round_level_coef;  //公积金环数等级系数
       public s_round_coef;    //公积金环数系数
       public s_level_coef;    //公积金等级系数
       public s_round_final;   //公积金常数
       public pet_exp_level_coef;  //宠物战斗经验宠物等级系数
       public pet_exp_final;   //宠物战斗经验常数
       public nautodo: number;     //是否自动寻路
       public nautonextlun: number;    //自动领取下一轮
       public nlunendmsgid: number;    //不自动领取确定提示
       public ngaojianground: number;  //高奖环数
       public ngaojiangmsgid: number;  //高奖任务全部完成提示
       public doublepoint: number; //消耗双倍点数

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.type = data.getUint32();
           this.levelgroup = data.getUint32();
           this.levelmin = data.getUint32();
           this.levelmax = data.getUint32();
           this.maxnum = data.getUint32();
           this.exp_round_level_coef = data.getFloat64();
           this.exp_round_final = data.getFloat64();
           this.exp_level_coef = data.getFloat64();
           this.exp_final = data.getFloat64();
           this.money_round_level_coef = data.getFloat64();
           this.money_round_coef = data.getFloat64();
           this.money_level_coef = data.getFloat64();
           this.money_round_final = data.getFloat64();
           this.s_round_level_coef = data.getFloat64();
           this.s_round_coef = data.getFloat64();
           this.s_level_coef = data.getFloat64();
           this.s_round_final = data.getFloat64();
           this.pet_exp_level_coef = data.getFloat64();
           this.pet_exp_final = data.getFloat64();
           this.nautodo = data.getUint32();
           this.nautonextlun = data.getUint32();
           this.nlunendmsgid = data.getUint32();
           this.ngaojianground = data.getUint32();
           this.ngaojiangmsgid = data.getUint32();
           this.doublepoint = data.getUint32();
       }
    }
}