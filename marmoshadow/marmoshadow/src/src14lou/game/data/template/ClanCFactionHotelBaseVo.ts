/**
* name g公会旅馆数据表
*/
module game.data.template{
	export class ClanCFactionHotelBaseVo{
		public id:number;//公会旅馆等级
		public levelupcost:number;//公会旅馆升级费用
		public peoplemax:number;//公会人数上限
		public apprenticemax:number;//公会学徒数量上限
		public costeveryday:number;//公会旅馆维护费用/天

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.levelupcost = data.getUint32();
			this.peoplemax = data.getUint32();
			this.apprenticemax = data.getUint32();
			this.costeveryday = data.getUint32();
		}
	}
}