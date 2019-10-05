/**
* name g公会大厅数据表
*/
module game.data.template{
	export class ClanCFactionGoldBankBaseVo{
		public id:number;//公会金库等级
		public levelupcost:number;//升级费用
		public bonus:number;//公会工资常数
		public allbonus:number;//公会工资系数
		public limitmoney:number;//公会资金上限
		public costeveryday:number;//公会金库维护费用/天

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.levelupcost = data.getUint32();
			this.bonus = data.getUint32();
			this.allbonus = data.getUint32();
			this.limitmoney = data.getUint32();
			this.costeveryday = data.getUint32();
		}
	}
}