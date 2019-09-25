/**
* name g公会药房数据表
*/
module game.data.template{
	export class ClanCFactionDrugStoreBaseVo{
		public id:number;//公会药房等级
		public levelupcost:number;//药房升级费用
		public dragnummax:number;//各类药材生成数量上限
		public doublemoney:number;//双倍产药公会资金消耗
		public trimoney:number;//三倍产药公会资金消耗
		public costeveryday:number;//公会药房维护费用/天

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.levelupcost = data.getUint32();
			this.dragnummax = data.getUint32();
			this.doublemoney = data.getUint32();
			this.trimoney = data.getUint32();
			this.costeveryday = data.getUint32();
		}
	}
}