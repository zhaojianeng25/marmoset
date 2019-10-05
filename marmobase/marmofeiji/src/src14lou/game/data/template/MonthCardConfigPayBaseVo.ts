/**
* name 
*/
module game.data.template{
	export class MonthCardConfigPayBaseVo{
		public id:number;//ID
		public name:string;//奖励名称
		public rewardid:number;//奖励ID
		public itemid:number;//道具ID
		public itemnum:number;//道具数量
		public type:number//奖励类型;
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.rewardid = data.getUint32();
			this.itemid = data.getUint32();
			this.itemnum = data.getUint32();
			this.type = data.getUint32();
			
		}
	}
}